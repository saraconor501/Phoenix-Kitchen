import { Link } from 'react-router-dom'
import Logo from '../../../public/logo.jpg'
import hr from './Header.module.css'


const Header = () => {



  return (
    <>
      <header className={hr.header}>
        <div className={hr.header_content}>

          <div className={hr.leftBlock}>

            <div className={hr.logoContainer}>
              <Link to="/" className={hr.logoTitle}>Phoenix Kitchen</Link>
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
              <img src="https://thumbs.dreamstime.com/z/shopping-cart-icon-vector-sale-170608151.jpg?w=768" style={{width:"46px" ,height:'46px'}} className={hr.icon} />
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