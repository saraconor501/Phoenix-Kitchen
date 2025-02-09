import { Link } from 'react-router-dom'
import Logo from '../../../public/logo.jpg'
import hr from './Header.module.css'
const Header = () => {
  return (
    <>
      <header>
        <div className={hr.logos}>
        <img src={Logo} alt="" className={hr.logo}/>
        <h1 className={hr.logo__title}>Phoenix Kitchen</h1>
        </div>
        <nav className={hr.nav}>
          <p><Link>Search</Link></p>
          <p><Link>Account</Link></p>
          <p><Link>Cart</Link></p>
        </nav>
      </header>
    </>
  )
}

export default Header