import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './SwiperBanner.css';
import { Autoplay } from 'swiper/modules';

import KFCBanner from '/public/bannerImg/KFCBanner.jpg';
import PapajonhsBanner from '/public/bannerImg/papajonhs.png';

export default function SwiperBanner() {
  const banners = [
    { img: KFCBanner, alt: "KFC Banner" },
    { img: PapajonhsBanner, alt: "Papa John's Banner" },
    { img: "https://eda.yandex/images/3805363/7bffa350b92d232acf20719a3c6c5dae-1100x825.jpg", alt: "Yandex Banner" }
  ];

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      centeredSlides={true}
      loop={true}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      modules={[Autoplay]}
      className="mySwiper"
      >
      {banners.map((banner, index) => (
        <SwiperSlide key={index}>
          <div className="banner-slide" style={{ backgroundImage: `url(${banner.img})` }}>
            <span className="banner-alt">{banner.alt}</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}