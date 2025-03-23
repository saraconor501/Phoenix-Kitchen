import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import useAuthStore from '../../store/auth-slice/auth-slice';
import { useCart } from '../../store/cart-slice/cart-slice';
import hr from './Header.module.css';
import Logo from '../../assets/images/logo.jpg';
import AdressButton from '../AdressButton/AdressButton';
import ProfileAside from '../ProfileAside/ProfileAside';

const Header = () => {
  const { user, isLoading: isAuthLoading } = useAuthStore();
  const { cart } = useCart();
  const [isAtTop, setIsAtTop] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <>
      <header className={`${hr.header} ${isAtTop ? hr.atTop : ''} ${isLoaded ? hr.loaded : ''}`}>
        <div className={hr.header_content}>
          <div className={hr.leftBlock}>
            <div className={hr.logoContainer}>
              {isLoading ? (
                <div className={hr.skeletonLogo}></div>
              ) : (
                <>
                  <Link to="/">
                    <img src={Logo} alt="Logo" className={hr.Logo} />
                  </Link>
                  <Link to="/" className={hr.logoTitle}>
                    Phoenix Kitchen
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
              <ProfileAside />
            )}
          </div>
        </div>
      </header>

      <div style={{ height: '72px' }}></div>
    </>
  );
};

export default Header;