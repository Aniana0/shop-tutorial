import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getCategoryFilter, getStorageImg, storage } from '../api/firebase';
import CategoryProductList from './CategoryProductList';
import SlideItem from './SlideItem';
import { listAll, ref } from 'firebase/storage';

export default function CategoryPage() {
  const [ products, setProducts ] = useState([]);
  const [ imgUrls, setImgUrls ] = useState([]);
  const { category } = useParams(); // 카테고리에 담긴 정보를 가져옴

  useEffect(()=>{
    const fetchImgs = async ()=>{
      const imgListRef = ref(storage, `${category}`);
      try{
        const imgRef = await listAll(imgListRef);
        const selectRef = categoryRandomRef(imgRef.items, 3);
        const urls = await Promise.all(
          selectRef.map(ref=>getStorageImg(ref))
        );
        setImgUrls(urls);
      }catch(err){
        console.error(err)
      }
    }
    fetchImgs();
  },[category])

  function categoryRandomRef(refs, count){
    return refs.sort(()=> 0.5 - Math.random()).slice(0,count)
  }

  useEffect(()=>{
    getCategoryFilter(category).then((product)=>{setProducts(product)})
    .catch(error=>{console.error(error)})
  }, [category])
  return (
    <div>
      <SlideItem imgs={imgUrls}/>
      <CategoryProductList category={category} product={products}/>
    </div>
  )
}
