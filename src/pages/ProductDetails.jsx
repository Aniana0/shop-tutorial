import React from 'react'
import { useLocation } from 'react-router-dom'

export default function ProductDetails() {
  const state = useLocation().state
  const {id, img, title, description, price, option} = state;
  // 현재 url의 정보를 가져오는 리액트 돔 훅
  return (
    <div className='container'>
      <div className="detailPage">
        <div className="detailImg">
          <img src={img} alt={title} />
        </div>
      </div>
    </div>
  )
}
