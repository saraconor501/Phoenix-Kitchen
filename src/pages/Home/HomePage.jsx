import Banner from "../../components/Banner/Banner"
import Shoops from "../../components/Shoops/Shoops"
import hp from './HomePage.module.css'

const HomePage = () => {

  return (
    <>
      <Banner />
      <div className={hp.container}>
        <Shoops />
      </div>
      
    </>
  )
}

export default HomePage;
