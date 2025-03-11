import { useState } from "react";
import styles from "./AdressButton.module.css";
import location from "../../assets/images/location.svg";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Rate } from 'antd';
const AdressButton = () => {
  const [showMap, setShowMap] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null); // Состояние для выбранного маркера
  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  const windowStyle = {
    width: "300px",
    height: "200px"
  }
  const center = {
    lat: 42.8142,
    lng: 73.8481,
  };

  const markers = [
    { 
      lat: 42.798482905690975,
      lng: 73.84558608159031,
      id: 1,
      title: "Империя Пиццы",
      src: ""
    },
    { lat: 42.8100, lng: 73.8450, id: 2, title: "KFC" },
    { lat: 42.8200, lng: 73.8500, id: 3, title: "Ресторан 3" },
  ];

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
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
                <img
                  src="https://cdn-icons-png.flaticon.com/512/12520/12520057.png"
                  alt="Close"
                  onClick={() => setShowMap(false)}
                  className={styles.close__img}
                  style={{ width: "28px", height: "28px" }}
                />
              </div>
            </div>
            <LoadScript googleMapsApiKey="AIzaSyDGablINFu89l7DgwcM9L7WMf6BsqXi_Ws">
              <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                {markers.map((marker) => (
                  <Marker
                    key={marker.id}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    onClick={() => handleMarkerClick(marker)} // Обработчик клика по маркеру
                  />
                ))}

                {selectedMarker && (
                  <InfoWindow
                  style={windowStyle}
                    position={{
                      lat: selectedMarker.lat,
                      lng: selectedMarker.lng,
                    }}
                    onCloseClick={() => setSelectedMarker(null)}
                  >
                    <div>
                      <h3>{selectedMarker.title}</h3>
                      <Rate allowHalf defaultValue={4.5}/>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdressButton;
