import React from 'react'
import ProductItem from './ProductItem'

export default function CategoryProductList({category, product}) {
  return (
    <div className='container'>
        <h2>{category}</h2>
        <ul className='productsList'>
            {product && product.map((product=>(
                <ProductItem key={product.id} product={product} />
            )))}
        </ul>
    </div>
  )
}
