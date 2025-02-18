import { Link } from 'react-router-dom'
import Mypizza from '../../../public/images/mypizza.svg'
import kfc from '../../../public/images/kfc.svg'
import sp from './Shoops.module.css'
const Shoops = () => {
  return (
    <>
       <div className={sp.container}>
        <Link to={'/restaraunts/mypizza'}>
        <div className={sp.block}>
          <img src={Mypizza} alt="" />
        </div>
        </Link>
        <Link to={'/restaraunts/kfc'}>
        <div className={sp.block}>
          <img src={kfc} alt="" />
        </div>
        </Link>
       </div>
    </>
  )
}

export default Shoops