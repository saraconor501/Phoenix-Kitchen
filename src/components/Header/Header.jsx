import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/auth-slice/auth-slice";
import hr from "./Header.module.css";
import Logo from "../../../public/logo.jpg";
import AdressButton from "../AdressButton/AdressButton";
import ProfileAside from "../ProfileAside/ProfileAside";

const Header = () => {
  const { user } = useAuthStore();
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!user);
    
    
    setTimeout(() => setIsLoaded(true), 100);

    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [user]);

  return (
    <>
      <header className={`${hr.header} ${isAtTop ? hr.atTop : ""} ${isLoaded ? hr.loaded : ""}`}>
        <div className={hr.header_content}>
          <div className={hr.leftBlock}>
            <div className={hr.logoContainer}>
              <Link to="/">
                <img src={Logo} alt="Logo" className={hr.Logo} />
              </Link>
              <Link to="/" className={hr.logoTitle}>Phoenix Kitchen</Link>
            </div>
            <div className={hr.searchContainer}>
              <input type="text" placeholder="Название, кухня или блюдо" className={hr.searchInput} />
              <button className={hr.searchButton}>Найти</button>
            </div>
          <AdressButton/>
          </div>
          <div className={hr.rightBlock}>
            {isAuthenticated && (
              <Link className={hr.cartLink}>
                <img src="https://thumbs.dreamstime.com/z/shopping-cart-icon-vector-sale-170608151.jpg?w=768" className={hr.icon} alt="cart" />
              </Link>
            )}
            <ProfileAside/>
          </div>
        </div>
      </header>

      <div style={{ height: "72px" }}></div>
    </>
  );
};

export default Header;