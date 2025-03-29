import { useState, useRef, useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents, useMap } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase-config";
import { message, Spin } from 'antd';
import useAuthStore from "../../store/auth-slice/auth-slice";
import styles from "./AdressButton.module.css";
import locationIcon from "../../assets/images/location.svg";
import closeIcon from "../../assets/images/close.svg";

const DEFAULT_COORDS = [42.819791, 73.844014];

const markerIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const CenterMarker = ({ setAddress, setCoordinates }) => {
  const map = useMap();
  const markerRef = useRef(null);

  useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      const newCoords = [center.lat, center.lng];
      setCoordinates(newCoords);
      reverseGeocode(newCoords, setAddress);
    }
  });

  useEffect(() => {
    const updateMarkerPosition = () => {
      if (markerRef.current) {
        markerRef.current.setLatLng(map.getCenter());
      }
    };

    map.on('move', updateMarkerPosition);
    return () => map.off('move', updateMarkerPosition);
  }, [map]);

  return <Marker position={map.getCenter()} icon={markerIcon} ref={markerRef} />;
};

const reverseGeocode = async ([lat, lng], setAddress) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    );
    const data = await response.json();

    if (data.address) {
      const { road, house_number } = data.address;
      setAddress([road, house_number].filter(Boolean).join(', ') || "Адрес не определен");
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    setAddress("Ошибка определения адреса");
  }
};

const AddressButton = () => {
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoordinates] = useState(DEFAULT_COORDS);
  const [address, setAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const { user } = useAuthStore();
  const [messageApi, contextHolder] = message.useMessage();
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const loadSavedLocation = async () => {
      if (user?.uid) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().location?.coordinates) {
          const { lat, lng } = docSnap.data().location.coordinates;
          setUserLocation([lat, lng]);
          setCoordinates([lat, lng]);
        }
      }
    };

    loadSavedLocation();
  }, [user]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = [position.coords.latitude, position.coords.longitude];
          setCoordinates(coords);
          if (mapRef.current) {
            mapRef.current.flyTo(coords);
          }
          messageApi.success("Текущее местоположение определено");
        },
        () => {
          flyToSavedOrDefault();
        }
      );
    } else {
      flyToSavedOrDefault();
    }
  };

  const flyToSavedOrDefault = () => {
    const targetCoords = userLocation || DEFAULT_COORDS;
    setCoordinates(targetCoords);
    if (mapRef.current) {
      mapRef.current.flyTo(targetCoords);
    }
    messageApi.info(userLocation
      ? "Используется сохраненное местоположение"
      : "Используется местоположение по умолчанию"
    );
  };

  const saveLocation = async () => {
    if (!user?.uid) {
      messageApi.error("Требуется авторизация");
      return;
    }

setIsSaving(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        "location": {
          address,
          coordinates: {
            lat: coordinates[0],
            lng: coordinates[1]
          }
        }
      });

      setUserLocation(coordinates);
      messageApi.success("Адрес сохранен!");
      setShowMap(false);
    } catch (error) {
      console.error("Firestore error:", error);
      messageApi.error("Ошибка сохранения");
    } finally {
      setIsSaving(false);
    }
  };

  const clearAddress = () => {
    setAddress("");
    inputRef.current.focus();
  };

  return (
    <div className={styles.container}>
      {contextHolder}

      <button
        onClick={() => setShowMap(true)}
        className={styles.button}
      >
        <img src={locationIcon} alt="" className={styles.icon} />
        <p>Выбрать местоположение</p>
      </button>

      {showMap && (
        <div className={styles.overlay}>
          <div className={`${styles.modal} ${isSaving ? styles.modalLoading : ''}`}>
            {isSaving && (
              <div className={styles.loaderOverlay}>
                <Spin size="large" />
              </div>
            )}

            <div className={styles.header}>
              <div>
                <h3>Укажите адрес доставки</h3>
                <p>Чтобы курьер смог вас найти</p>
              </div>
              <button
                onClick={() => !isSaving && setShowMap(false)}
                className={styles.closeButton}
                disabled={isSaving}
              >
                ×
              </button>
            </div>

            <div className={styles.searchContainer}>
              <div className={styles.inputWrapper}>
                <input
                  ref={inputRef}
                  type="text"
                  value={address}
                  readOnly
                  placeholder="Адрес появится здесь"
                  className={styles.input}
                />
                {address && !isSaving && (
                  <button
                    onClick={clearAddress}
                    className={styles.clearButton}
                  >
                    <img src={closeIcon} alt="Очистить" />
                  </button>
                )}
              </div>

              <button
                onClick={saveLocation}
                disabled={!address || isSaving}
                className={styles.actionButton}
              >
                {isSaving ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>

            <div className={styles.mapWrapper}>
              <MapContainer
                center={coordinates}
                zoom={14}
                style={{ height: '100%', width: '100%' }}
                whenCreated={(map) => {
                  mapRef.current = map;
                  getCurrentLocation();
                }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <CenterMarker 
                  setAddress={setAddress}
                  setCoordinates={setCoordinates}
                />
              </MapContainer>

              <button
                onClick={getCurrentLocation}
                className={styles.locateButton}
                title="Мое местоположение"
                disabled={isSaving}
              >
                <img src={locationIcon} alt="Мое местоположение" width={16} height={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressButton;