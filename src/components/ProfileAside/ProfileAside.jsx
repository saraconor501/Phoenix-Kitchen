import { useState, useEffect } from "react";
import userIcon from '../../assets/images/user.svg';
import { Drawer, message } from "antd";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../../store/auth-slice/auth-slice";
import ConfirmOut from "../Confirms/ConfirmLogOut/ConfrimLogOut";
import p from "./ProfileAside.module.css";
import { Modal } from 'antd';
import adminIcon from '../../assets/images/admin.svg'
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase-config";
const ProfileAside = () => {
  const { user } = useAuthStore();
  const [openResponsive, setOpenResponsive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || ""
  });
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isAuthenticated = !!user;


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user?.id) return;

    
    try {
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, {
        name: formData.name,
        email: formData.email,
      });
      
      message.success("Данные успешно обновлены!");
      setIsEditing(false);
    } catch (error) {
      console.error("Ошибка обновления данных: ", error);
      message.error("Ошибка при обновлении данных");
    }
  };


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
        <div>
          <Link to={'/admin'}>
            <div className={p.nav}>
              <div className={p.navi}>Панель админа</div>
              <img src={adminIcon} alt="" />
            </div>
          </Link>
           <div>
           <div>
      <div
        onClick={() => setOpenResponsive(true)}
        className={`${p.nav} ${location.pathname === "/profile" ? p.active : ""}`}>
        <div className={p.navi}>Данные админа</div>
        <img
          style={{ borderRadius: "50%", width: "40px" }}
          src="https://www.svgrepo.com/show/497407/profile-circle.svg"
          className={p.icon}
          alt="Профиль"
        />
      </div>
      <Modal
        footer={
          isEditing ? (
            [
              <button key="cancel" onClick={() => setIsEditing(false)}>
                Отмена
              </button>,
              <button key="save" type="primary" onClick={handleSave}>
                Сохранить
              </button>
            ]
          ) : (
            [
              <button key="edit" type="primary" onClick={() => setIsEditing(true)}>
                Изменить
              </button>
            ]
          )
        }
        centered
        open={openResponsive}
        onCancel={() => setOpenResponsive(false)}
        width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '50%',
          xxl: '40%',
        }}>
        <h3 style={{ paddingBottom: '20px' }}>Данные админа</h3>
        <img src={user?.photoURL} alt="Фото профиля" />
        <form>
          <label style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '18px', fontWeight: 700, paddingRight: '80px' }}>Имя</p>
            <input 
              type="text"
              name="name"
              value={formData.name}
              className={p.Inputs}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </label>
          <label>
            <p style={{ fontSize: '18px', fontWeight: 700, paddingRight: '30px' }}>Эл. Почта</p>
            <input 
              type="text"
              name="email"
              value={formData.email}
              className={p.Inputs}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </label>
        </form>
      </Modal>
    </div>
           </div>
           </div>

          
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