import { Link } from 'react-router-dom';
import Mypizza from '../../assets/images/EmpirePizza.webp';
import KFC from '../../assets/images/KFC.jpg';
import Navat from '../../assets/images/Navat.webp';
import PapaJonhs from '../../assets/images/PapaJonhs.jpg';
import raiting from '../../assets/places/raiting.svg';
import sp from './Restauraunts.module.css';

const Restauraunts = () => {
  return (
    <>
        <h1 className={sp.resTitle}>Рестораны</h1>
       <div className={sp.container}>
        <Link to={'/restaraunts/mypizza'} className={sp.link}>
        <div className={sp.block__wrapper}>
        <img src={Mypizza} alt="" />
        <div className={sp.sub__block}>
          <div className={sp.raiting}>
          <img src={raiting} alt='raiteng' />
          <span>4.7</span>
          </div>
          <h4>Империя Пиццы</h4>
          <h5>Улица Бейшеналиева 9</h5>
        </div>
        </div>
        </Link>
        <Link to={'/restaraunts/kfc'} className={sp.link}>
        <div className={sp.block__wrapper}>
        <img src={KFC} alt="" />
        <div className={sp.sub__block}>
          <div className={sp.raiting}>
          <img src={raiting} alt='raiteng' />
          <span>4.2</span>
          </div>
          <h4>KFC</h4>
          <h5>ТЦ Бишкек Парк</h5>
        </div>
        </div>
        </Link>
        <Link to={'/restaraunts/navat'} className={sp.link}>
        <div className={sp.block__wrapper}>
        <img src={Navat} alt="" />
        <div className={sp.sub__block}>
          <div className={sp.raiting}>
          <img src={raiting} alt='raiteng' />
          <span>4.3</span>
          </div>
          <h4>Navat</h4>
          <h5>ул. Ибраимова, 42</h5>
        </div>
        </div>
        </Link>
        <Link to={'/restaraunts/papajonhs'} className={sp.link}>
        <div className={sp.block__wrapper}>
        <img src={PapaJonhs} alt="" style={{height: '210px'}}/>
        <div className={sp.sub__block}>
          <div className={sp.raiting}>
          <img src={raiting} alt='raiteng' />
          <span>4.0</span>
          </div>
          <h4>Papa Jonhs</h4>
          <h5>ул Юнусалиева 278Б</h5>
        </div>
        </div>
        </Link>
        {/* <Link to={'/restaraunts/kfc'}>
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
        </Link> */}
       </div>
    </>
  )
}

export default Restauraunts;