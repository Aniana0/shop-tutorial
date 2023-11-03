import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { ref, get, getDatabase } from 'firebase/database';

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
console.log(process.env.REACT_APP_FIREBASE_DATABASE_URL)
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
        console.log(user)
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