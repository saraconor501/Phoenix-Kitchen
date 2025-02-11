import { Link } from 'react-router-dom'
import Logo from '../../../public/logo.jpg'
import hr from './Header.module.css'
const Header = () => {
  return (
    <>
      <header>
        <div className={hr.header}>
          <div className={hr.logos}>
            <img src={Logo} alt="" className={hr.logo} />
            <Link to={'/'} style={{textDecoration:"none"}}><h1 className={hr.logo__title}>Phoenix Kitchen</h1></Link>
          </div>
          <nav className={hr.navigate}>
            <p className={hr.nav}><img src="/images/search.svg" /> <Link>Search</Link></p>
            <p className={hr.nav}><img src="/images/account.svg" /> <Link to={'/auth/login'}>Account</Link></p>
            <p className={hr.nav}><img src="/images/cart.svg" /> <Link>Cart</Link></p>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header