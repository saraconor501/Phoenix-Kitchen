import { useState, useEffect } from "react";
import { Drawer } from "antd";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/auth-slice/auth-slice";
import ConfirmOut from "../Confirms/ConfirmLogOut/ConfrimLogOut";
import styles from "./ProfileAside.module.css";

const ProfileAside = () => {
    const { user } = useAuthStore();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user;

    const showLoading = () => {
        setOpen(true);
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
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
            >
                <div className={styles.nav}>
                    <Link to="/auth/login">Мои данные</Link>
                    <img
                        style={{ borderRadius: "50%" }}
                        src={user?.photoURL || "/images/account.svg"}
                        className={styles.icon}
                        alt="Профиль"
                    />
                </div>
                <div className={styles.nav}>
                    Мои адреса <img className={styles.iconLocation} src="/images/location.svg" />
                </div>
                <div className={styles.nav}>
                    Мои заказы{" "}
                    <img
                        className={styles.iconOrders}
                        src="https://icons.veryicon.com/png/o/miscellaneous/icondian/icon-order-1.png"
                        alt=""
                    />
                </div>
                <div className={styles.nav}>
                    Мои избранные{" "}
                    <img
                        className={styles.iconSave}
                        src="https://static-00.iconduck.com/assets.00/save-2-icon-256x256-2dseotbs.png"
                    />
                </div>

                <ConfirmOut />
            </Drawer>
        </>
    );
};

export default ProfileAside;