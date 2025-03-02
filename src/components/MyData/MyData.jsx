import { useState } from "react";
import styles from './MyData.module.css';
import close from "../../../public/images/close.svg";
const MyData = () => {
    const [show, setShow] = useState(false);
  return (
    <>
        <div className={styles.container}>
      <button onClick={() => setShow(!show)} className={styles.button}>
        Мои данные
      </button>
      {show && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.close}>
              <img
                src={close}
                alt="Close"
                onClick={() => setShow(false)}
                className={styles.close__img}
              />
            </div>
            <h3>Укажите адрес доставки</h3>
            <p>Чтобы курьер смог вас найти</p>
            <label>
              <div className={styles.input}>
                
              </div>
            </label>
          </div>
        </div>
      )}
    </div>

    </>
  )
}

export default MyData