import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { ref, get, getDatabase, set, remove } from 'firebase/database';
import {getDownloadURL, getStorage, ref as storageRef} from 'firebase/storage'
import { v4 as uuid } from 'uuid'; // 고유 식별자 생성 패키지

const firebaseConfig = {
    apiKey : process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain : process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId : process.env.REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL : process.env.REACT_APP_FIREBASE_DATABASE_URL,
    storageBucket : process.env.REACT_APP_FIREBASE_STORAGE_BUKET
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
const storage = getStorage(app);

export {storage};

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
        option : product.option.split(",").map(option=>option.trim()).join(", "),
        price : parseInt(product.price)
        // join : 단일 문자로 다시 결합
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

// 장바구니 저장 요소 업뎃
export async function updateCart(userId, product){
    try{
        const cartRef = ref(database, `cart/${userId}/${product.id}`);
        await set(cartRef, product);
    }catch(err){
        console.error(err);
    }
};

export async function getCart(userId){
    try{
        const snapshot = await(get(ref(database,`cart/${userId}`)));
        if(snapshot.exists()){
            const item = snapshot.val();
            return Object.values(item);
        }else{
            return [];
        }
    }catch(err){
        console.error(err);
    }
}

export async function deleteCart(userId, productId){
    console.log(userId, productId)
    return remove(ref(database, `cart/${userId}/${productId}`))
}

// DB에 등록한 상품 카테고리 불러오기
export async function getCategory(){
    const database = getDatabase();
    const categoryRef = ref(database, 'products');
    try{
        const snapshot = await get(categoryRef);
        if(snapshot.exists()){
            return Object.values(snapshot.val());
        }else{
            return []
        }
    }catch(error){
        console.error(error);
    }
};

// 데이터 베이스 카테고리 필터 -> 분류 출력
export async function getCategoryFilter(category){
    return get(ref(database, `products`)).then(snapshot=>{
        if(snapshot.exists()){
            const allProducts = Object.values(snapshot.val()); // 일단 모두 가져오기
            const filterProduct = allProducts.filter(product => product.category === category);
            return filterProduct;
        }else{
            return []
        }
    })
}

// 상품 검색
export async function searchProduct(query){
    try{
        const dbRef = ref(database, 'products');
        const snapshot = await get(dbRef);

        if(snapshot.exists()){
            const data = snapshot.val();
            const allProducts = Object.values(data);

            if(allProducts.length === 0){
                return []
            }else{
                const matchItems = allProducts.filter(product => {
                    const itemTitle = product.title.toLowerCase(); // 받아온 문자열을 소문자로
                    return itemTitle.includes(query.toLowerCase());
                })
                return matchItems;
            }
        }else{
            return []
        }
    }catch(error){
        console.error(error);
    }
};

// 스토리지 이미지 가져오기
export async function getStorageImg(imgPath){
    try{
        const imgRef = storageRef(storage, imgPath);
        const downloadURL = await getDownloadURL(imgRef);
        return downloadURL;
    }catch(error){
        console.error(error);
    }
}



//이메일 회원가입 저장
export async function joinEmail(email, password){
    try{
        const userCredit = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredit.user;
        return user;
    }catch(err){
        console.error(err);
    }
}


export async function loginEmail(email, password){
    try{
        const userCredit = await signInWithEmailAndPassword(auth, email, password);
        return userCredit.user;
    }catch(err){
        console.error(err);
    }
}