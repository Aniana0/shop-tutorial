import React from 'react'
import UseCart from '../context/UseCart'
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";

export default function CartList({product, index}) {
    const {addItemCart, deleteItemCart} = UseCart();
    const setPrice = parseInt(product.price).toLocaleString();

    const deleteItem = ()=>{
        deleteItemCart.mutate(product.id);
    }

    const plusItem = ()=>{
        addItemCart.mutate({...product, quantity : product.quantity + 1})
    }
    const minusItem = ()=>{
        if(product.quantity < 2){
            alert('더 이상 뺄 수 없습니다.')
            return
            // 바로 종료
        }
        addItemCart.mutate({...product, quantity : product.quantity - 1})
    }
    return (
        <li>
            <div className="textWrap">
                <p>{index+1}</p>
                <img src={product.img} alt={product.title} />
                <p>{product.title}</p>
                <p>{product.option}</p>
                <p>{setPrice} 원</p>
            </div>
            <div className="quantityWrap">
                <p>수량 : {product.quantity}개</p>
                <FaPlusSquare onClick={plusItem} />
                <FaMinusSquare onClick={minusItem} />
            </div>
            <button onClick={deleteItem}>X</button>
        </li>
    )
}
