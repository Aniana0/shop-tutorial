import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { ref, get, getDatabase, set } from 'firebase/database';
import { v4 as uuid } from 'uuid' // 고유 식별자 생성 패키지

const firebaseConfig = {
    apiKey : process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain : process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId : process.env.REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL : process.env.REACT_APP_FIREBASE_DATABASE_URL
    // process.env -> node.js의 (전역개체)환경변수
    /*
    환경 변수 : 실행중인 프로세스에 사용할 수 있고, 애플리케이션을 구현할 수 있는 키-값으로 이루어진 변수
    외부에서 값을 받아와서 설정할 수 있게 코드를 직접 하드코딩 안하고, 개인정보 매개변수로 분리해서 관리
    process = 현재 node의 프로세스의 전역객체 실행중인 프로세스에 접근해서 정보를 받아옴
    .env는 process에서 사용할 수 있는 모든 환경 변수를 포함하는 객체
    */   
};
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(); // 구글 로그인 세팅
const auth = getAuth();
const database = getDatabase(app);


provider.setCustomParameters({
    prompt : 'select_account'
})
export async function login(){
    try{
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        return user;
    }catch(err){
        console.log(err)
    }
}

export async function logout(){
    // catch는 넣어주는게 좋음
    try{
        await signOut(auth);
    }catch(err){
        console.log(err);
    }
}

// 로그인시 정보를 계속 유지
export function onUserState(callback){
    onAuthStateChanged(auth, async(user)=>{
        // const updateUser = user;
        // callback(updateUser);
        try{
            if(user){
                const isAdmin = await adminUser(user);
                const updateUser = {...user, isAdmin};
                callback(updateUser);
            }else{
                callback(null);
            }
        }catch(err){
            console.log(err);
        }
    })
}

// 관리자 계정 관리
async function adminUser(user){
    try{
        const snapshot = await get(ref(database,"admin"));
        if(snapshot.exists()){
            const admins = snapshot.val();
            const isAdmin = admins.includes(user.email);
            return isAdmin
        }
    }catch(err){
        console.log(err)
    }
}


// 파이어 베이스에 상품 정보 연동하기
export async function addProducts(product,img){
    const id = uuid();
    return set(ref(database, `products/${id}`),{
        ...product,
        id,
        img,
    })
}

// 가져오기
export async function getProducts(){
    return get(ref(database, 'products')).then((snapshot)=>{
        if(snapshot.exists()){
            return Object.values(snapshot.val())
        }else{
            return []
        }
    })
}

// async : 비동기 방식의 데이터 처리방법 (promise 이후 나온 거, 최신)
// 실시간 데이터 베이스의 노드와 함께 생성하고, 읽기 작업을 시작하면 호출받은 정보값을 반환
// .then((snapshot)) snapshot = 내가 참조하고 있는 노드
// snapshot이라는 변수명을 사용하는 이유는 그냥 약속임
//  특정 순간 저장용
// .exist() - 스냅샷에 노드 데이터가 있는지 확인