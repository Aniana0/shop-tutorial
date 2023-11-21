import React from 'react'
import Products from '../coponents/Products'
import SlideItem from '../coponents/SlideItem'
import { storage } from '../api/firebase'

export default function AllProducts() {
  
  return (
    <div className='container'>
      {/* <SlideItem imgURL={storage}/> */}
      <Products />
    </div>
  )
}
