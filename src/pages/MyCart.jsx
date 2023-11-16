import React from 'react'
import CartList from '../coponents/CartList'
import UseCart from '../context/UseCart'

export default function MyCart() {
  const {cartInfo : {data : products}} =UseCart();
  const isItem = products && products.length > 0;
  const delivery = 3000;

  const totalPrice = products ? products.reduce(
    (prev, current)=>prev + parseInt(current.price) * current.quantity, 0
  ) : 0;
//prev 초기값
//current 현재처리중인 아이템 목록을 받아와 최종적으로 prev에ㅔ 담아오는 역
// 이작업을 reduce에서 반복하며, 배열을 업데이트 하는 방식
// reduce()는 배열에 들어있는 값을 반환하는 hook
  
  return (
    <div className='container'>
      <h2>장바구니 목록</h2>
      {!isItem && <p className='noneText'>장바구니에 상품이 없습니다.</p>}
      {isItem && (
        <ul className="cartList">
          {products && products.map((product, index)=>(
            <CartList key={product.id} product={product} index={index} />
          ))}
        </ul>
      )}
      <div className="priceWrap">
        <p>상품 가격 : {totalPrice.toLocaleString()}</p>
        <p>배송비 : {delivery.toLocaleString()}원</p>
        <p>총 주문 금액 : {(delivery+totalPrice).toLocaleString()}원</p>
      </div>
    </div>
  )
}
