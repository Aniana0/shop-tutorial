import { createContext, useContext, useEffect, useState } from "react";
import { onUserState, login, logout } from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({children}){
    const [user, setUser] = useState();
    const [unSubscribe, setUnSubscribe] = useState();

    useEffect(()=>{
        const userChange = (newUser)=>{
            console.log(newUser);
            setUser(newUser);
        };
        const unSubscribeFunc = onUserState(userChange);
        setUnSubscribe(()=>unSubscribeFunc);

        return ()=>{
            if(unSubscribeFunc){
                unSubscribeFunc();
            }
        }
    }, [])
    
    return (
        <AuthContext.Provider value={{user, login, logout, uid: user && user.uid}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext(){
    return useContext(AuthContext)
}