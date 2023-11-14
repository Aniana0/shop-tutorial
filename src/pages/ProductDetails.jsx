import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import UseCart from '../context/UseCart';

export default function ProductDetails() {
  const state = useLocation().state
  const {id, img, title, description, price, option} = state;

  const setOpt = option.split(",").map(option=>option.trim());
  const setPrice = parseInt(price).toLocaleString();

  const {addItemCart} = UseCart();

  const [selected, setSelected] = useState(setOpt && setOpt[0]);
  const [success, setSuccess] = useState();

  const selectOpt = (e) => {
    setSelected(e.target.value);
  };

  const cartItem = ()=>{
    const product = {id, img, title, price, option : selected, quantity : 1}
    // quantity 수량 체크
    addItemCart.mutate(product,{
      onSuccess : ()=>{
        setSuccess('장바구니에 상품이 추가되었습니다.')
      }
    })
  };

  // 현재 url의 정보를 가져오는 리액트 돔 훅
  return (
    <div className='container'>
      <div className="detailPage">
        <div className="detailImg">
          <img src={img} alt={title} />
        </div>
        <div className="detailText">
          <h2>{title}</h2>
          <p>가격<span>{setPrice}원</span></p>
          <div className="detailOpt">
            {/* 리액트에서는 for가 htlFor가 된다 */}
            <label className='labelText' htmlFor='optSelect'>옵션</label>
            <select name="default" id="optSelect" onChange={selectOpt} value={selected}>
              {setOpt && setOpt.map((option, index)=>(
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="text">
            <p>{description}</p>
          </div>
          <div className="detailBtns">
            <button className="cartBtn" onClick={cartItem}>장바구니</button>
            <button className="buyBtn">바로구매</button>
          </div>
          {success && (
            <p>{success}</p>
          )}
        </div>
      </div>
    </div>
  )
}
