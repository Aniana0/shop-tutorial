import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api/firebase'
import ProductItem from './ProductItem'
import { styled } from 'styled-components'

export default function Products() {
  // 서버의 데이터와 동기화 해주는 hook = react-query
  const {
    isLoading,
    error,
    data : products
  } = useQuery({
    queryKey: ['products'], //가져오려는 값
    queryFn: getProducts // 값을 가져올 때 사용하는 함수
  })
  console.log(products)
  return (
    <>
      {isLoading && 
        <p>상품 정보를 업데이트 중입니다.</p>
      }
      {error &&
        <p>상품 정보를 불러올 수 없습니다.</p>
      }
      <ul className='productsList'>
        {products && products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </>
  )
}