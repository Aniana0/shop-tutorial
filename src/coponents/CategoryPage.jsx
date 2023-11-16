import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getCategoryFilter } from '../api/firebase';
import CategoryProductList from './CategoryProductList';

export default function CategoryPage() {
  const [ products, setProducts ] = useState([]);
  const { category } = useParams(); // 카테고리에 담긴 정보를 가져옴
  useEffect(()=>{
    getCategoryFilter(category).then((product)=>{setProducts(product)})
    .catch(error=>{console.error(error)})
  }, [category])
  return (
    <div>
      <CategoryProductList category={category} product={products}/>
    </div>
  )
}
