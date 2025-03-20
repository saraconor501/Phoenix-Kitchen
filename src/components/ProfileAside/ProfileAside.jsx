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
        <Link className={p.LinkLogin} to={'/auth/login'}>
          <button className={p.loginBtn}>Войти</button>
        </Link>
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
            style={{ borderRadius: "50%",width:"40px" }}
            src="https://www.svgrepo.com/show/497407/profile-circle.svg"
            className={p.icon}
            alt="Профиль"
          />
        </Link>
        <div className={p.nav}>
          Мои адреса <img src="https://cdn-icons-png.flaticon.com/512/32/32213.png" alt="" />
        </div>
        <div className={p.nav}>
          Мои заказы <img src="https://cdn-icons-png.flaticon.com/512/32/32213.png" alt="" />
        </div>
        <div className={p.nav}>
          Мои избранные <img src="https://cdn-icons-png.flaticon.com/512/32/32213.png" alt="" />
        </div>

        <ConfirmOut />
      </Drawer>
    </>
  );
};

export default ProfileAside;