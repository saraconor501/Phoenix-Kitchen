import { useState, useEffect } from "react";
import userIcon from '../../assets/images/user.svg';
import { Drawer } from "antd";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../../store/auth-slice/auth-slice";
import ConfirmOut from "../Confirms/ConfirmLogOut/ConfrimLogOut";
import p from "./ProfileAside.module.css";
import { Modal } from 'antd';
const ProfileAside = () => {
  const { user } = useAuthStore();
  const [openResponsive, setOpenResponsive] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  // const [role, setRole] = useState(null)
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
            src={userIcon}
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
        {user?.role === "admin" ? (
          <Link to={'/admin'}>
            <div className={p.nav}>
              <div className={p.navi}>Панель админа </div>
            </div>
          </Link>
            ) : (
              <>
              <div
          onClick={() => setOpenResponsive(true)}
          className={`${p.nav} ${location.pathname === "/profile" ? p.active : ""}`} >
          <div className={p.navi}>Мои данные</div>
          <img
            style={{ borderRadius: "50%", width: "40px" }}
            src="https://www.svgrepo.com/show/497407/profile-circle.svg"
            className={p.icon}
            alt="Профиль"
          />
        </div>
        <Modal
        footer={[
          <button key="back" onClick={() => setOpenResponsive(false)}>
            Отмена
          </button>,
           <button key="submit" type="primary" onClick={() => setOpenResponsive(false)}>
           Потвердить
         </button>,
        ]}
          centered
          open={openResponsive}
          onOk={() => setOpenResponsive(false)}
          onCancel={() => setOpenResponsive(false)}
          width={{
            xs: '90%',
            sm: '80%',
            md: '70%',
            lg: '60%',
            xl: '50%',
            xxl: '40%',
          }}
        >
          <h3 style={{ paddingBottom: '20px' }}>Мои данные</h3>
          <form action="">
            <label htmlFor="">
              <p style={{ fontSize: '18px', fontWeight: 700, paddingRight: '80px' }}>Имя</p>
              <input type="text" value={user?.name} className={p.Inputs} readOnly/>
            </label>
            <label htmlFor="">
              <p style={{ fontSize: '18px', fontWeight: 700, paddingRight: '30px' }}>Эл. Почта</p>
              <input type="text" value={user?.email} className={p.Inputs}  readOnly/>
            </label>
          </form>
        </Modal>


        <div
          onClick={() => setOpenResponsive(true)}
          className={p.nav} >
          <div className={p.navi}>Мои заказы</div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/32/32213.png"
            alt="Профиль"
          />
        </div>
        <Modal
        footer={[
          <button key="back" onClick={() => setOpenResponsive(false)}>
            Return
          </button>,
           <button key="submit" type="primary" onClick={() => setOpenResponsive(false)}>
           Submit
         </button>
        ]}
          centered
          open={openResponsive}
          onOk={() => setOpenResponsive(false)}
          onCancel={() => setOpenResponsive(false)}
          width={{
            xs: '90%',
            sm: '80%',
            md: '70%',
            lg: '60%',
            xl: '50%',
            xxl: '40%',
          }}
        >
          <h3 style={{ paddingBottom: '20px' }}>Мои заказы</h3>
          <form action="">
            <label htmlFor="">
              <p style={{ fontSize: '18px', fontWeight: 700, paddingRight: '80px' }}>Имя</p>
              <input type="text" value={user?.name} className={p.Inputs} readOnly/>
            </label>
            <label htmlFor="">
              <p style={{ fontSize: '18px', fontWeight: 700, paddingRight: '30px' }}>Эл. Почта</p>
              <input type="text" value={user?.email} className={p.Inputs}  readOnly/>
            </label>
          </form>
        </Modal>
        <div className={p.nav}>
         Избранные <img src="https://cdn-icons-png.flaticon.com/512/32/32213.png" alt="" />
        </div>
        </>
            )}
        
        <ConfirmOut />
      </Drawer>
    </>
  );
};

export default ProfileAside;