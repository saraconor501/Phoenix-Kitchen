import { useState, useEffect } from "react";
import { Drawer } from "antd";
import useAuthStore from "../../store/auth-slice/auth-slice";
import styles from "./ProfileAside.module.css";
import { Link } from "react-router-dom";

const ProfileAside = () => {
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {logoutUser}=useAuthStore()

  const isAuthenticated = !!user;

  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
            src={user?.photoURL || "/images/account.svg"}
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
        maskClosable={true}
        maskStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
        bodyStyle={{ overflow: "hidden" }}
      >
        {loading ? (
          <p>Загрузка...</p>
        ) : (
          <>
            <div onClick={logoutUser}>
              Профиль
            </div>
           
          </>
        )}
      </Drawer>
    </>
  );
};

export default ProfileAside;