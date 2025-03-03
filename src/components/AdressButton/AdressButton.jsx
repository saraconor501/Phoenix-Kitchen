import { useState, useRef } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { YandexMapsKey } from "../../utils/yandex/yandex-config";
import styles from "./AdressButton.module.css";
import location from "../../../public/images/location.svg";
import closeIcon from "../../../public/images/close.svg";

const YandexLocationPicker = () => {
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoordinates] = useState([42.819791, 73.844014]);
  const [address, setAddress] = useState("");
  const [mapCenter, setMapCenter] = useState(coordinates);
  const mapRef = useRef(null);

  const handleGeocode = async (coords) => {
    const response = await fetch(
      `https://geocode-maps.yandex.ru/1.x/?apikey=${YandexMapsKey}&format=json&geocode=${coords[1]},${coords[0]}`
    );
    const data = await response.json();
    const geoObject = data.response.GeoObjectCollection.featureMember[0]?.GeoObject;
    if (geoObject) {
      setAddress(geoObject.name);
    }
  };

  const handleMapClick = (e) => {
    const coords = e.get("coords");
    setCoordinates(coords);
    setMapCenter(coords);
    handleGeocode(coords);
  };

  const handleMapMove = (e) => {
    const center = e.get('target').getCenter();
    setMapCenter(center);
    handleGeocode(center);
  };

  const handleClearInput = () => {
    setAddress("");
  };

  const handleResetMap = () => {
    if (mapRef.current) {
      mapRef.current.setCenter([42.819791, 73.844014], 10);
      setMapCenter([42.819791, 73.844014]);
      handleGeocode([42.819791, 73.844014]);
    }
  };

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
                <img src='https://cdn-icons-png.flaticon.com/512/12520/12520057.png' alt="Close" onClick={() => setShowMap(false)} className={styles.close__img} style={{ width: "28px", height: "28px" }} />
              </div>
            </div>
            <label>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Введите улицу или дом"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={styles.input}
                />
                {address && (
                  <button onClick={handleClearInput} className={styles.clearButton}>
                    <img style={{ background: 'transparent' }} src={closeIcon} alt="Clear" />
                  </button>
                )}
              </div>
              <button className={styles.buttonSumbit} onClick={() => handleGeocode(mapCenter)}>OK</button>
            </label>
            <YMaps query={{ apikey: YandexMapsKey }}>
              <Map
                state={{ center: mapCenter, zoom: 10 }}
                width="900px"
                height="400px"
                onClick={handleMapClick}
                onBoundsChange={handleMapMove}
                instanceRef={mapRef}
              >
                <div className={styles.resetButtonContainer}>
                  <button onClick={handleResetMap} className={styles.resetButton}>
                    <img src="https://cdn-icons-png.flaticon.com/512/5358/5358645.png" alt="Reset" style={{ width: "34px" }} />
                  </button>
                </div>
                <Placemark geometry={mapCenter} />
              </Map>
            </YMaps>
          </div>
        </div>
      )}
    </div>
  );
};

export default YandexLocationPicker;