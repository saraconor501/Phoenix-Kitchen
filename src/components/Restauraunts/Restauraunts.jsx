import { Link } from 'react-router-dom'
import Mypizza from '/public/images/mypizza.svg'
import Kfc from '/public/images/kfc.svg'
import Navat from '/public/images/navat.svg'
import Kulikov from '/public/images/kulikov.webp'
import PapaJonhs from '/public/images/papajonhs.png'
import sp from './Restauraunts.module.css'

const Restauraunts = () => {
  return (
    <>
        <h1 className={sp.resTitle}>Рестораны</h1>
       <div className={sp.container}>
        <Link to={'/restaraunts/mypizza'}>
        <div className={sp.blockMyPizza}>
          <img src={Mypizza} alt="" />
        </div>
        </Link>
        <Link to={'/restaraunts/kfc'}>
        <div className={sp.blockKfc}>
          <img src={Kfc} alt="" />
        </div>
        </Link>
        <Link to={'/restaraunts/navat'}>
        <div className={sp.blockNavat}>
          <img src={Navat} alt=""/>
        </div>
        </Link>
        <Link to={'/restaraunts/navat'}>
        <div className={sp.blockKulikov}>
          <img src={Kulikov} alt=""/>
        </div>
        </Link>
        <Link to={'/restaraunts/navat'}>
        <div className={sp.blockPapajonhs}>
          <img src={PapaJonhs} alt=""/>
        </div>
        </Link>
       </div>
    </>
  )
}

export default Restauraunts;