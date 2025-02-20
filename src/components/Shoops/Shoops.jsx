import { Link } from 'react-router-dom'

import sp from './Shoops.module.css'

const Shoops = () => {
  return (
    <>
       <div className={sp.container}>
        <Link to={'/restaraunts/mypizza'}>
        <div className={sp.block}>
          <img  alt="" />
        </div>
        </Link>
        <Link to={'/restaraunts/kfc'}>
        <div className={sp.block}>
          <img  alt="" />
        </div>
        </Link>
       </div>
    </>
  )
}

export default Shoops