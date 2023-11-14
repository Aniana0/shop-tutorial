import { getCart, updateCart } from "../api/firebase";
import { useAuthContext } from "./AuthContext";
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'

export default function UseCart(){
    const { uid } = useAuthContext();
    const queryClient = useQueryClient();

    const cartInfo = useQuery(['cart', uid || ''], ()=>getCart(uid), {enable : !uid});

    const addItemCart = useMutation(
        // 정보를 업데이트 할 때 사용하는 구문
        (product) => updateCart(uid, product), {
            onSuccess : ()=>{
                queryClient.invalidateQueries(['cart', uid])
            }
        }
    );

    return { cartInfo, addItemCart };
}