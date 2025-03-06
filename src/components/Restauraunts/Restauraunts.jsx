import { Link } from 'react-router-dom'
import Mypizza from '../../assets/images/mypizza.svg'
import Kfc from '../../assets/images/kfc.svg'
import Navat from '../../assets/images/navat.svg'
import Kulikov from '../../assets/images/kulikov.webp'

import PapaJonhs from '../../assets/images/papajonhs.png'
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
        <Link to={'/restaraunts/papajonhs'}>
        <div className={sp.blockPapajonhs}>
          <img src={PapaJonhs} alt=""/>
        </div>
        </Link>
       </div>
    </>
  )
}

export default Restauraunts;