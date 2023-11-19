import React, { useEffect } from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';

import {Autoplay, EffectFade} from 'swiper/modules'
import 'swiper/css/effect-fade'
import { useState } from 'react';
import { getStorageImg, storage } from '../api/firebase';


export default function SlideItem() {
  const slider = {
    width: '600px',
    height: '500px'
  }
  // const sliderImg = [
  //   "http://res.cloudinary.com/dwagajimv/image/upload/s--Lfzt8I_J--/v1699498279/qkkqjhbypd3lv3va83db.jpg",
  //   "http://res.cloudinary.com/dwagajimv/image/upload/s--MDhD6U1F--/v1699499348/y7coha9shpq6gzc8ksit.jpg",
  //   "http://res.cloudinary.com/dwagajimv/image/upload/s--MIqZnB40--/v1699498626/wrj2fbazqjl4bgk1rc4a.jpg",
  //   "http://res.cloudinary.com/dwagajimv/image/upload/s--tTDrEnL0--/v1699498393/fcbkehotl8kqfouixl4b.jpg"
  // ]
  const [imgURL, setImgURL] = useState([]);
  useEffect(()=>{
    async function loadImg(){
      try{
        const urls = await Promise.all(
          imgURL.map(imgPath=>getStorageImg(imgPath, storage))
        )
        setImgURL(urls)
      }catch(err){
        console.error(err);
      }
    }
    loadImg();
  }, [imgURL])
  return (
    <>
      {/* 스와이퍼 컨테이너 */}
      <Swiper
        style={slider}
        slidesPerView={1}
        loop={true}
        autoplay={{
          deley : 3000
        }}
        speed={500}
        modules={ [Autoplay, EffectFade] }
        effect='fade'
      >
        {imgURL.map((el,index)=>(
          <SwiperSlide key={index} style={{background:`url(${el}) no-repeat center center / cover`}}></SwiperSlide>
        ))}
      </Swiper>
    </>
  )
};
