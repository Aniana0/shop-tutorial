import React, { useEffect } from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';

import {Autoplay, EffectFade} from 'swiper/modules'
import 'swiper/css/effect-fade'
import { useState } from 'react';
import { getStorageImg, storage } from '../api/firebase';


export default function SlideItem({imgs}) {
  const slider = {
    width: '100%',
    height: '600px',
    marginBottom : "24px"
  }

  const [imgURL, setImgURL] = useState([]);

  useEffect(()=>{
    const loadImg = async ()=>{
      try{
        const urls = await Promise.all(
          imgs.map((imgPath)=>getStorageImg(imgPath))
        );
        setImgURL(urls);
      }catch(err){
        console.error(err);
      }
    }
    loadImg();
  }, [imgs])

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
