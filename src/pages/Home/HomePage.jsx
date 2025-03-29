import Banner from "../../components/Banner/Banner"
import Shoops from "../../components/Shoops/Shoops"
import AboutUs from "../AboutUs/AboutUs";
// import hp from './HomePage.module.css'

const HomePage = () => {

  return (
    <>
      <Banner />
      <div>
        <Shoops />
      </div>
      <AboutUs />
    </>
  )
}

export default HomePage;
