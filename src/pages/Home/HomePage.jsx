import Shoops from "../../components/ShoopsDetails/Details"
import SwiperBanner from "../../components/SwiperBanner/SwiperBanner"
import hp from './HomePage.module.css'
import KFC from "../../components/KFC/KFC";
const HomePage = () => {

  return (
    <>
      <SwiperBanner />
      <div className={hp.container}>
        <Shoops />
        <KFC />
      </div>

    </>
  )
}

export default HomePage;
