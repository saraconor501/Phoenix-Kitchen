import { Swiper, SwiperSlide } from 'swiper/react';
import KFCBanner from '../../../public/bannerImg/KFCBanner.jpg'
import PapajonhsBanner from '../../../public/bannerImg/papajonhs.png'
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
        <SwiperSlide><img src={PapajonhsBanner} alt="" /></SwiperSlide>
      </Swiper>
    </>
  );
}