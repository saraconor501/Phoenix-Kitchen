import { useEffect, useMemo, useState } from 'react';
import { Link,  useLocation  } from 'react-router-dom';
import burgerIcon from '../../assets/images/burger.svg'
import { Badge } from 'antd';
import cartIcon from '../../assets/images/cart.svg'
import useAuthStore from '../../store/auth-slice/auth-slice';
import { useCart } from '../../store/cart-slice/cart-slice';
import hr from './Header.module.css';
import AdressButton from '../AdressButton/AdressButton';
import ProfileAside from '../ProfileAside/ProfileAside';
import Pizza from "../../assets/images/mypizza.svg";
import Icon from '../../assets/images/logo.jpg';
import close from '../../assets/images/close.svg'
const Header = () => {
  const { user, isLoading: isAuthLoading } = useAuthStore();
  const { cart } = useCart();
  const [isAtTop, setIsAtTop] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = !!user;
  const isLoading = useMemo(() => isAuthLoading, [isAuthLoading]);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);

    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [user]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
   const location = useLocation()

   const isEmpirePizza = location.pathname === "/restaraunts/ImpirePizza";

  return (
    <>
      <header className={`${hr.header} ${isAtTop ? hr.atTop : ''} ${isLoaded ? hr.loaded : ''}`}>
        <div className={hr.header_content}>
          <div className={hr.leftBlock}>
          <button className={hr.burger} onClick={() => setIsMenuOpen(true)}>
            <img src={burgerIcon} alt="" className={hr.burgerIcon}/>
          </button>
            <div className={hr.logoContainer}>
              {isLoading ? (
                <div className={hr.skeletonLogo}></div>
              ) : (
                <>
                  <Link to="/" className={hr.logoTitle}>
                    <img src={isEmpirePizza ? Pizza : Icon} style={{width: "60px"}}/>
                  </Link>
                </>
              )}
            </div>
            <div className={hr.searchContainer}>
              {isLoading ? (
                <div className={hr.skeletonSearch}></div>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Название, кухня или блюдо"
                    className={hr.searchInput}
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <Link to={`/search?query=${searchQuery}`}>
                    <button className={hr.searchButton}>Найти</button>
                  </Link>
                </>
              )}
            </div>
            {isLoading ? (
              <div className={hr.skeletonAdress}></div>
            ) : (
              <AdressButton />
            )}
          </div>

          <div className={hr.rightBlock}>
            {isLoading ? (
              <>
                <div className={hr.skeletonIcon}></div>
                <div className={hr.skeletonProfile}></div>
              </>
            ) : isAuthenticated ? (
              <>
                <Link to="/cart" className={hr.cartLink}>
                  <Badge count={totalItems} overflowCount={99} className={hr.cartBadge}>
                    <img
                      src="https://thumbs.dreamstime.com/z/shopping-cart-icon-vector-sale-170608151.jpg?w=768"
                      className={hr.cartIcon}
                      alt="cart"
                    />
                  </Badge>
                </Link>
                <ProfileAside />
              </>
            ) : (
              <div className={hr.profileResp}>
              <ProfileAside />
              </div>
            )}
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className={hr.fullscreenMenu}>
          <button className={hr.closeButton} onClick={() => setIsMenuOpen(false)}><img src={close} alt='close' className={hr.closeImg}/></button>
          <AdressButton />
          <div style={{display: "flex", justifyContent: "center"}}>
          <p>Профиль</p>
          <ProfileAside />
          </div>
          <Link to="/cart">
          <div style={{display: "flex", justifyContent: "center"}}>
          <p style={{color: "black"}}>Корзина</p>
          <img
          src={cartIcon}
          className={hr.cartIcon}
          alt="cart" />
          </div>
          </Link>
        </div>
        )}
    </>
  );
};

export default Header;