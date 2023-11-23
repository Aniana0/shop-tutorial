import React, { useEffect, useState } from 'react'
import Products from '../coponents/Products'
import SlideItem from '../coponents/SlideItem'
import { getStorageImg, storage } from '../api/firebase'
import { listAll, ref } from 'firebase/storage';

export default function AllProducts() {
  const [imgUrls, setImgUrls] = useState([]);

  useEffect(()=>{
    const featchImgs = async ()=>{
      const imgListRef = ref(storage);
      try{
        const imgRef = await listAll(imgListRef);
        const selectRef = categoryRandomRef(imgRef.items, 4);
        const urls = await Promise.all(
          selectRef.map((ref)=>getStorageImg(ref))
        );
        setImgUrls(urls);
      }catch(err){
        console.error(err);
      }
    }
    featchImgs();
  }, [])
  function categoryRandomRef(refs, count){
    return refs.sort(()=>0.5 - Math.random()).slice(0, count);
    // sort => 순서를 특정한 기준으로 정렬[-1, 0, 1] -> 0은 정렬하지 않음
    // 특정 배열을 받아서 sort를 돌려서 -1 , 0, 1이 나오도록 랜덤으로 수를 생성(math.random)
    // Math.random은 0~1사이의 난수 생성 -> 여기서 0.5를 빼면 균등하게 음수와 양수가 나옴
    // sort는 함수를 넣어준걸 토대로 비교를 해서 정렬하는 함수임(음수가 나오면 앞으로, 양수가 나오면 뒤로, 0은 멈춤)
  }
  
  return (
    <div className='container'>
      <SlideItem imgs={imgUrls} />
      <Products />
    </div>
  )
}
