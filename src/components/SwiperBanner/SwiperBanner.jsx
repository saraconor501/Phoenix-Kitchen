import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './SwiperBanner.css';
import mypizza from '../../../public/bannerImg/mypizza.webp'
import kulikov from '../../../public/bannerImg/kulikov.jpg'
import navat from '../../../public/bannerImg/navat.jpg'
import { Autoplay} from 'swiper/modules';
const SwiperBanner = () => {
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
        <SwiperSlide><img src={mypizza} alt="" /></SwiperSlide>
        <SwiperSlide><img src={kulikov} alt="" /></SwiperSlide>
        <SwiperSlide><img src={navat} alt="" /></SwiperSlide>
      </Swiper>
    </>
  )
}

export default SwiperBanner