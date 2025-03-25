import BannerVideo from '../../assets/images/banner.mp4'
const Banner = () => {
  return (
    <>
        <video width={"100%"} height={"600px"} style={{objectFit: 'cover'}}autoPlay muted loop>
            <source src={BannerVideo} type="video/mp4"/>
        </video>
    </>
  )
}

export default Banner