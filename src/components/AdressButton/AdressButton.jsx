import { useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { YandexMapsKey } from "../../utils/yandex/yandex-config";
import styles from './AdressButton.module.css'
const YandexLocationPicker = () => {
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoordinates] = useState([42.819791, 73.844014]);

  const handleMapClick = (e) => {
    const coords = e.get("coords");
    setCoordinates(coords);
  };

  return (
    <div className={styles.container}>
      <button onClick={() => setShowMap(!showMap)} className={styles.button}>Выбрать местоположение</button>
      {showMap && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <YMaps query={{ apikey: YandexMapsKey }}>
              <Map
                state={{ center: coordinates, zoom: 10 }}
                width="600px"
                height="400px"
                onClick={handleMapClick}
              >
                <Placemark geometry={coordinates} />
              </Map>
            </YMaps>
            <button onClick={() => setShowMap(false)} className={styles.closeButton}>Закрыть</button>
          </div>
        </div>
      )}
      <p>Выбранные координаты: {coordinates.join(", ")}</p>
    </div>
  );
};

export default YandexLocationPicker;
