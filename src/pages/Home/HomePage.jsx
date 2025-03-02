import Shoops from "../../components/Shoops/Shoops"
import SwiperBanner from "../../components/SwiperBanner/SwiperBanner"
import hp from './HomePage.module.css'

const HomePage = () => {

  return (
    <>
      <SwiperBanner />
      <div className={hp.container}>
        <Shoops />
      </div>
    </>
  )
}

export default HomePage;
