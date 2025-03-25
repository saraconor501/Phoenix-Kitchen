import BannerVideo from '../../assets/images/banner.mp4'
import b from './Banner.module.css'
const Banner = () => {
  return (
    <>
        <video width={"100%"} height={"600px"} className={b.banner} autoPlay muted loop>
            <source src={BannerVideo} type="video/mp4"/>
        </video>
    </>
  )
}

export default Banner