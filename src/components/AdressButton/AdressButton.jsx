import { useState } from "react";
import styles from "./AdressButton.module.css";
import location from "../../assets/images/location.svg";
import MapLeaflet from "../Map-Leaflet/MapLeaflet";



const AdressButton = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className={styles.container}>
      <button onClick={() => setShowMap(!showMap)} className={styles.button}>
        <div style={{ background: "transparent" }}>
          <img style={{ background: "#fc8e34", paddingRight: "4px" }} src={location} alt="Location" /> Выбрать местоположение
        </div>
      </button>
      {showMap && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div>
                <h3>Укажите адрес доставки</h3>
                <p>Чтобы курьер смог вас найти</p>
              </div>
              <div className={styles.close}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/12520/12520057.png"
                  alt="Close"
                  onClick={() => setShowMap(false)}
                  className={styles.close__img}
                  style={{ width: "28px", height: "28px" }}
                />
              </div>
            </div>
            <div>
              <MapLeaflet />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdressButton;
