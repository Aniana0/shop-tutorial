import React from 'react'
import ProductItem from './ProductItem'
import { styled } from 'styled-components'

export default function CategoryProductList({category, product}) {
  return (
    <div className='container'>
        <CategoryTitle>{category}</CategoryTitle>
        <ul className='productsList'>
            {product && product.map((product=>(
                <ProductItem key={product.id} product={product} />
            )))}
        </ul>
    </div>
  )
}

const CategoryTitle = styled.h2`
  color: #1aa624;
  font-size: 36px;
  padding: 24px 0px 100px;
  font-weight: normal;
`