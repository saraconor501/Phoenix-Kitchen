import { Link } from 'react-router-dom'
import hr from './Header.module.css'
import Logo from '../../../public/logo.jpg'

const Header = () => {



  return (
    <>
      <header className={hr.header}>
        <div className={hr.header_content}>

          <div className={hr.leftBlock}>

            <div className={hr.logoContainer}>
            <img src={Logo} alt="" className={hr.Logo}/><Link to="/" className={hr.logoTitle}>Phoenix Kitchen</Link>
            </div>

            <div className={hr.searchContainer}>
              <input type="text" placeholder="Search" className={hr.searchInput} />
              <button className={hr.searchButton}>
                Найти
              </button>
            </div>
          </div>

          <div className={hr.rightBlock}>
            <Link className={hr.cartLink}>
              <img src="/images/cart.svg" className={hr.icon} />
            </Link>
            <Link to="/auth/login" className={hr.profileLink}>
              <img src="/images/account.svg" className={hr.icon} />
            </Link>
          </div>
        </div>

      </header>

      <div style={{ height: "72px" }}>

      </div>
    </>

  )
}

export default Header;