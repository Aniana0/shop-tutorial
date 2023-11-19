import React from 'react'
import Products from '../coponents/Products'
import SlideItem from '../coponents/SlideItem'

export default function AllProducts() {
  
  return (
    <div className='container'>
      <SlideItem imgURL={slidePath}/>
      <Products />
    </div>
  )
}
