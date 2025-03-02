import React, { useState } from "react";
import { Button, Drawer } from "antd";
import useAuthStore from "../../store/auth-slice/auth-slice";
import styles from './ProfileAside.module.css'
import { Link } from "react-router-dom";
import MyData from "../MyData/MyData";
const ProfileAside = () => {
    const { user } = useAuthStore()
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(!user);
  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <>
      {isAuthenticated ? (
          <div className={styles.profileContainer}>
            <button onClick={showLoading} className={styles.iconbtn}>
                  <img style={{borderRadius:"50%"}} src={user?.photoURL || "/images/account.svg"} className={styles.icon} alt="Профиль" />
            </button>
              </div>
            ) : (
                <Link className={styles.LinkLogin} to="/auth/login"><button className={styles.loginBtn}>Войти</button></Link>
            )}
      <Drawer
        closable
        destroyOnClose
        title={<p>Loading Drawer</p>}
        placement="right"
        open={open}
        loading={loading}
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
        <MyData/>
        <p>Мои адреса</p>
        <p>Мои заказы</p>
      </Drawer>
    </>
  );
};
export default ProfileAside;
