import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import "./SwiperBanner.css";

import mypizza from "../../../public/bannerImg/mypizza.webp";
import kulikov from "../../../public/bannerImg/kulikov.jpg";
import navat from "../../../public/bannerImg/navat.jpg";

const SwiperBanner = () => {
  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      effect="fade"
      modules={[Autoplay, EffectFade]}
      className="custom-swiper"
    >
      <SwiperSlide>
        <img src={mypizza} alt="mypizza" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={kulikov} alt="kulikov" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={navat} alt="navat" />
      </SwiperSlide>
    
    </Swiper>
  );
};

export default SwiperBanner;