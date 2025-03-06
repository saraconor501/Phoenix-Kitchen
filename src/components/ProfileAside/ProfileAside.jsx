import { useState, useEffect } from "react";
import useAuthStore from "../../store/auth-slice/auth-slice";
import { Drawer, Button } from "antd";
import styles from "./ProfileAside.module.css";
import account from '../../assets/images/account.svg'
import { Link } from "react-router-dom";
import MyData from "../MyData/MyData";
const ProfileAside = () => {
  const { user } = useAuthStore(); 
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user; 

  const showLoading = () => {
      setOpen(true);
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
      }, 1000);
  };

  useEffect(() => {
      document.body.style.overflow = open ? "hidden" : "";
      return () => {
          document.body.style.overflow = "";
      };
  }, [open]);

  return (
      <>
          {isAuthenticated ? (
              <button onClick={showLoading} className={styles.iconbtn}>
                  <img
                      style={{ borderRadius: "50%" }}
                      src={user?.photoURL || {account}}
                      className={styles.icon}
                      alt="Профиль"
                  />
              </button>
          ) : (
              <Link className={styles.LinkLogin} to="/auth/login">
                  <button className={styles.loginBtn}>Войти</button>
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
              <Button
                  type="primary"
                  style={{
                      marginBottom: 16,
                  }}
                  onClick={showLoading}
              >
                  Reload
              </Button>
              <MyData />
              <p>Мои адреса</p>
              <p>Мои заказы</p>
          </Drawer>
      </>
  );
};

export default ProfileAside;

