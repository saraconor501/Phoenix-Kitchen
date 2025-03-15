import { useState, useEffect } from "react";
import { Drawer } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/auth-slice/auth-slice";
import ConfirmOut from "../Confirms/ConfirmLogOut/ConfrimLogOut";
import p from "./ProfileAside.module.css";

const ProfileAside = () => {
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = !!user;


  useEffect(() => {
    if (location.pathname === "/profile") {
      setOpen(false);
    }
  }, [location.pathname]);

  const NavigateProfile = () => {
    navigate("/profile");
  };

  return (
    <>
      {isAuthenticated ? (
        <button onClick={() => setOpen(true)} className={p.iconbtn}>
          <img
            style={{ borderRadius: "50%" }}
            src={"https://www.svgrepo.com/show/497407/profile-circle.svg"}
            className={p.icon}
            alt="Профиль"
          />
        </button>
      ) : (
        <div className={p.LinkLogin} onClick={NavigateProfile}>
          <button className={p.loginBtn}>Войти</button>
        </div>
      )}

      <Drawer
        closable
        destroyOnClose
        title="Ваш профиль"
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Link
          to={"/profile"}
          className={`${p.nav} ${location.pathname === "/profile" ? p.active : ""}`} >
          <div className={p.navi}>Мои данные</div>
          <img
            style={{ borderRadius: "50%" }}
            src="https://www.svgrepo.com/show/497407/profile-circle.svg"
            className={p.icon}
            alt="Профиль"
          />
        </Link>
        <div className={p.nav}>
          Мои адреса
        </div>
        <div className={p.nav}>
          Мои заказы
        </div>
        <div className={p.nav}>
          Мои избранные
        </div>

        <ConfirmOut />
      </Drawer>
    </>
  );
};

export default ProfileAside;