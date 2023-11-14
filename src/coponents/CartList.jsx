import React from 'react'
import UseCart from '../context/UseCart'

export default function CartList({product, index}) {
    const {addItemCart} = UseCart();


    return (
        <li>
            <p>{index}</p>
            <img src={product.img} alt={product.title} />
            <p>{product.title}</p>
        </li>
    )
}
