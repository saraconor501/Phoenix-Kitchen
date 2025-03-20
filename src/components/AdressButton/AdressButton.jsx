import { useEffect, useState } from "react";
import styles from "./AdressButton.module.css";
import location from "../../assets/images/location.svg";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
const AdressButton = () => {
  const position = [51.505, -0.09]
  const [showMap, setShowMap] = useState(false);
  const [markers, setMarkers] = useState([
    { id: 1, lat: 51.505, lng: -0.09, text: "Маркер 1" },
    { id: 2, lat: 51.51, lng: -0.1, text: "Маркер 2" },
    { id: 3, lat: 51.515, lng: -0.11, text: "Маркер 3" }
  ]);

  const MapFix = () => {
    const map = useMap();
  
    useEffect(() => {
      setTimeout(() => {
        map.invalidateSize();
      }, 500);
    }, [map]);
  
    return null;
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
            <MapContainer center={[55.751244, 37.618423]} zoom={10} style={{ height: "400px", width: "600px", position: 'fixed' }}>
              <MapFix/>
              <TileLayer url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png" />
      <Marker position={[55.751244, 37.618423]}>
        <Popup>Москва</Popup>
      </Marker>
    </MapContainer>

            {/* <LoadScript googleMapsApiKey="AIzaSyDGablINFu89l7DgwcM9L7WMf6BsqXi_Ws">
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
            </LoadScript> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdressButton;
