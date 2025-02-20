import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import KFCBanner from '../../../public/bannerImg/KFCBanner.jpg'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './SwiperBanner.css'
import './SwiperBanner.jsx';
import { Autoplay} from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide><img src={KFCBanner} alt="" /></SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>sd</SwiperSlide>
      </Swiper>
    </>
  );
}