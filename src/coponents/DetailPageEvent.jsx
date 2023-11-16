import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function DetailPageEvent({product}) {
  // 단순한 페이지 이동이 목정이라면 : Link 사용
  // 페이지 이동하면서 데이터 전달하려면 : useNavigate사용
  const setPrice = parseInt(product.price).toLocaleString();
  const navigate = useNavigate();
  const detail = ()=>{
    navigate(`/products/detail/${product.id}`, {
      state: {
        id: product.id,
        img: product.img,
        price: product.price,
        option: product.option,
        category: product.category,
        description: product.description,
        title : product.title
      }
    });
  };
  return (
    <div onClick={detail}>
      <div className="imgWrap">
        <img src={product.img} alt={product.title} />
      </div>
      <div className="textWrap">
        <h3 className='itemTitle'>{product.title}</h3>
        <div className="itemFlex">
          <p className="itemPrice">{setPrice}원</p>
          <p className="itemOption">{product.option}</p>
        </div>
      </div>
    </div>
  )
}
