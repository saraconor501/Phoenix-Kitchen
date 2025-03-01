import { useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { YandexMapsKey } from "../../utils/yandex/yandex-config";
import styles from './AdressButton.module.css'
import location from '../../../public/images/location.svg'
import search from '../../../public/images/search.svg'
import close from '../../../public/images/close.svg'
const YandexLocationPicker = () => {
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoordinates] = useState([42.819791, 73.844014]);

  const handleMapClick = (e) => {
    const coords = e.get("coords");
    setCoordinates(coords);
  };

  return (
    <div className={styles.container}>
      <button onClick={() => setShowMap(!showMap)} className={styles.button}>
        <img src={location}/>
        Выбрать местоположение
        </button>
      {showMap && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.close}>
          <img src={close} alt="" onClick={() => setShowMap(false)} className={styles.close__img}/>
            </div>
          <h3>Укажите адрес доставки</h3>
          <p>Чтобы курьер смог вас найти</p>
          <label htmlFor="">
            <div className={styles.input}>
              <img src={search} alt="" className={styles.searchImg}/>
          <input type="text" placeholder="Ведите улицу или дом"/>
            </div>
          <button className={styles.sumbitButton}>OK</button>
          </label>
            <YMaps query={{ apikey: YandexMapsKey }}>
              <Map
                state={{ center: coordinates, zoom: 10 }}
                width="890px"
                height="400px"
                onClick={handleMapClick}
              >
                <Placemark geometry={coordinates} />
              </Map>
            </YMaps>
          </div>
        </div>
      )}
      {/* <p>Выбранные координаты: {coordinates.join(", ")}</p> */}
    </div>
  );
};

export default YandexLocationPicker;
