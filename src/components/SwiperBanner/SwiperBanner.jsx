import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import "./SwiperBanner.css";


const SwiperBanner = () => {
  return (
    <>
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
          <img src={'/bannerImg/mypizza.webp'} alt="mypizza" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={'/bannerImg/kulikov.jpg'} alt="kulikov" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={'/bannerImg/navat.jpg'} alt="navat" />
        </SwiperSlide>

      </Swiper>

      
    </>
  );
};

export default SwiperBanner;