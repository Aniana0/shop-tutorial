import React from 'react'
import CartList from '../coponents/CartList'
import UseCart from '../context/UseCart'

export default function MyCart() {
  const {cartInfo : {data : products}} =UseCart();
  const isItem = products && products.length > 0;
  return (
    <div className='container'>
      <h2>장바구니 목록</h2>
      {!isItem && <p>장바구니에 상품이 없습니다.</p>}
      {isItem && (
        <ul className="cartList">
          {products && products.map((product, index)=>(
            <CartList key={product.id} product={product} index={index} />
          ))}
        </ul>
      )}
    </div>
  )
}
