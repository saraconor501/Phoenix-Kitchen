import { useState } from "react";
import styles from "./AdressButton.module.css";
import location from "../../assets/images/location.svg";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const AdressButton = () => {
  const [showMap, setShowMap] = useState(false);
  const [markers, setMarkers] = useState([
    { id: 1, lat: 42.798269, lng: 73.845641, text: 'Империя Пиццы' }, 
    { id: 2, lat: 42.869487, lng: 74.610648, text: 'KFC' }, 
    { id: 3, lat: 42.799261, lng: 73.843996, text: 'Kulikov' },
    { id: 4, lat: 42.828028, lng: 74.603809, text: 'Navat' },
    { id: 5, lat: 42.827282, lng: 74.623349, text: 'PapaJonhs' },
  ]);

  const customIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconSize: [25, 41], // Размер иконки
      iconAnchor: [12, 41], // Точка привязки иконки
    });
  
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
            <MapContainer scrollWheelZoom={false} center={[42.819791,  73.844014]}  zoom={9} style={{ height: "400px", width: "890px" }}>
              <TileLayer url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png" />
              {markers.map((marker) => (
                <Marker icon={customIcon} key={marker.id} position={[marker.lat, marker.lng]}></Marker>
      ))}
    </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdressButton;
