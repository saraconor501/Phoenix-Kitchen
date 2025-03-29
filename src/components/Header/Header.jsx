import { useEffect, useMemo, useState } from 'react';
import Icon from '../../assets/images/logo.jpg';
import kfc from '../../assets/images/kfc.svg';
import kulikov from '../../assets/images/kulikov.webp';
import CartIcon from '../../assets/images/cart.svg';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import mypizza from '../../assets/images/mypizza.svg';
import burgerMenu from '../../assets/images/burger.svg';
import navat from '../../assets/images/Navat.webp';
import papajonhs from '../../assets/images/papajonhs.png';
import close from '../../assets/images/close.svg'
import useAuthStore from '../../store/auth-slice/auth-slice';
import { useCart } from '../../store/cart-slice/cart-slice';
import hr from './Header.module.css';
import AdressButton from '../AdressButton/AdressButton';
import ProfileAside from '../ProfileAside/ProfileAside';

const Header = () => {
  const { user, isLoading: isAuthLoading } = useAuthStore();
  const { cart } = useCart();
  const [isAtTop, setIsAtTop] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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

  const clearSearch = () => {
    setSearchQuery('');
  };

  
const restaurantLogos = {
  "ImpirePizza": mypizza,
  "KFC": kfc,
  "Kulikov": kulikov,
  "Navat": navat,
  "Papajohns": papajonhs,
};

const restaurantId = location.pathname.split("/restaraunts/")[1];

const logoSrc = restaurantLogos[restaurantId] || Icon;

  return (
    <>
      <header className={`${hr.header} ${isAtTop ? hr.atTop : ''} ${isLoaded ? hr.loaded : ''}`}>
      <div className={hr.header_content}>
        <div className={hr.leftBlock}>
        <div className={hr.burger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <img src={burgerMenu} alt="" style={{width: '40px'}}/>
            </div>
          <div className={hr.logoContainer}>
            {isLoading ? (
              <div className={hr.skeletonLogo}></div>
            ) : (
              <>
                <Link to="/" className={hr.logoTitle}>
             <img src={logoSrc} style={{width: "60px"}}/>
                </Link>
              </>
            )}
          </div>
          <div className={hr.searchContainer}>
            {isLoading ? (
              <div className={hr.skeletonSearch}></div>
            ) : (
              <>
                <div className={hr.searchInputWrapper}>
                  <input
                    type="text"
                    placeholder="Название, кухня или блюдо"
                    className={hr.searchInput}
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  {searchQuery && (
                    <button
                      className={hr.clearButton}
                      onClick={clearSearch}
                    >
                      <img style={{width:"16px"}} src="https://icones.pro/wp-content/uploads/2021/08/icone-x-grise.png"/>
                    </button>
                  )}
                </div>
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
                    src={CartIcon}
                    className={hr.cartIcon}
                    alt="cart"
                  />
                </Badge>
              </Link>
              <ProfileAside />
            </>
          ) : (
            <ProfileAside />
          )}
        </div>
      </div>
    </header >

  {isMenuOpen && (
  <div className={hr.fullscreenMenu}>
    <button className={hr.closeButton} onClick={() => setIsMenuOpen(false)}><img src={close} alt='close' className={hr.closeImg}/></button>
    <div style={{display: "flex", justifyContent: "center", columnGap: '20px'}}>
    <p className={hr.hover}>Профиль</p>
    <ProfileAside />
    </div>
    <Link to="/cart">
    <div style={{display: "flex", justifyContent: "center", columnGap: '20px'}}>
    <p className={hr.hover}>Корзина</p>
    <img
    src={CartIcon}
    className={hr.cartIcon}
    alt="cart" />
    </div>
    </Link>
  </div>
  )}
  <div style={{height: '70px'}}></div>
    </>
  );
};

export default Header;