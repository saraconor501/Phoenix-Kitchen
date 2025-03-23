import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Modal, Button, Spin, Skeleton, List } from "antd"; // Импортируем Spin для лоадера
import "./teast.css";

function Test() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [courier, setCourier] = useState(null);
  const [timer, setTimer] = useState(4);
  const [isCourierMoving, setIsCourierMoving] = useState(false);
  const mapRef = useRef(null);
  const markerRef = useRef(null);


  const [loading, setLoading] = useState(true);
  const onChange = (checked) => {
    setLoading(!checked);
  };
  const couriers = [
    {
      id: 1,
      name: "Иван Иванов",
      avatar: "https://via.placeholder.com/50",
      experience: "3 года",
      reviews: "4.8/5",
      car: "Toyota Corolla",
    },
    {
      id: 2,
      name: "Петр Петров",
      avatar: "https://via.placeholder.com/50",
      experience: "5 лет",
      reviews: "4.9/5",
      car: "Honda Civic",
    },
  ];

  const restaurantCoords = [55.7558, 37.6176]; // Координаты ресторана (Москва)
  const userCoords = [55.7602, 37.6175]; // Пример координат пользователя
  const route = [
    [restaurantCoords[0], restaurantCoords[1]],
    [userCoords[0], userCoords[1]],
  ];

  const handleOrderSubmit = () => {
    if (userAddress.trim()) {
      setIsModalOpen(true);
      setIsSearching(true);
      setTimer(4);
      setCourier(null);

      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      const timeout = setTimeout(() => {
        const randomCourier = couriers[Math.floor(Math.random() * couriers.length)];
        setCourier(randomCourier);
        setIsSearching(false);
        clearInterval(interval);
      }, 4000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else {
      alert("Пожалуйста, введите адрес.");
    }
  };

  const startCourierMovement = () => {
    if (mapRef.current && !isCourierMoving) {
      setIsCourierMoving(true);

      // Создаем маркер для курьера
      const carIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/744/744465.png", // Иконка машины
        iconSize: [40, 40],
      });

      const courierMarker = L.marker(restaurantCoords, { icon: carIcon }).addTo(mapRef.current);
      markerRef.current = courierMarker;

      // Анимация движения
      const duration = 5000; // Время анимации в миллисекундах
      const startTime = Date.now();

      const animate = () => {
        const progress = (Date.now() - startTime) / duration;
        if (progress > 1) {
          setIsCourierMoving(false);
          alert("Курьер прибыл! Оставьте отзыв.");
          return;
        }

        const lat = restaurantCoords[0] + (userCoords[0] - restaurantCoords[0]) * progress;
        const lng = restaurantCoords[1] + (userCoords[1] - restaurantCoords[1]) * progress;
        courierMarker.setLatLng([lat, lng]);

        requestAnimationFrame(animate);
      };

      animate();
    }
  };

  return (
    <div className="App">
      <h1>Оформление заказа</h1>
      <input
        type="text"
        placeholder="Введите ваш адрес"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
      />
      <button onClick={handleOrderSubmit}>Оформить заказ</button>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>
            Закрыть
          </Button>,
          !isSearching && (
            <Button
              key="start"
              type="primary"
              onClick={startCourierMovement}
              disabled={isCourierMoving}
            >
              {isCourierMoving ? "Курьер в пути..." : "Начать доставку"}
            </Button>
          ),
        ]}
      >
        <h3>{isSearching ? "Поиск курьера" : "Ваш курьер:"}</h3>
        {isSearching ? (
          <div>
          <p>Идет поиск курьера... Осталось: {timer} секунд</p>
          <div style={{ textAlign: "center" }}>
             <Skeleton loading={loading} active avatar>
              <List.Item.Meta
                
                />
            </Skeleton>
          </div>
                </div>
        ) : (
          courier && (
            <div className="courier-found">
              <hr style={{backgroundColor: "gray"}}/>
              <div className="courier-info">
                <img src={courier.avatar} alt={courier.name} />
                <p>{courier.name}</p>
                <p>Стаж: {courier.experience}</p>
                <p>Отзывы: {courier.reviews}</p>
                <p>Автомобиль: {courier.car}</p>
              </div>
              <div className="map-container">
                <MapContainer
                  center={restaurantCoords}
                  zoom={13}
                  style={{ height: "300px", width: "100%" }}
                  whenCreated={(map) => (mapRef.current = map)}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={restaurantCoords}>
                    <Popup>Ресторан</Popup>
                  </Marker>
                  <Marker position={userCoords}>
                    <Popup>Ваш адрес</Popup>
                  </Marker>
                  <Polyline positions={route} color="blue" />
                </MapContainer>
              </div>
            </div>
          )
        )}
      </Modal>
    </div>
  );
}

export default Test;