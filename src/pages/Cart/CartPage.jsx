
import React, { useEffect, useRef, useState } from "react";
import { useCart } from "../../store/cart-slice/cart-slice";
import cartStyle from "./CartPage.module.css";
import { useNavigate } from "react-router-dom";
import {  Button, Input, List, Modal, Select, Skeleton } from "antd";
import TextArea from "antd/es/input/TextArea";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
const CartPage = () => {
  const [courier, setCourier] = useState(null);
  const { cart, isLoading, removeFromCartMutation, refetch, addToCartMutation } = useCart();
  const [fadeCart, setFadeCart] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [debouncedCart, setDebouncedCart] = useState(cart);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [userAddress, setUserAddress] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [timer, setTimer] = useState(4);
    const [isCourierMoving, setIsCourierMoving] = useState(false);
    const mapRef = useRef(null);
    const markerRef = useRef(null);


  const [loading, setLoading] = useState(true);
    const onChange = (checked) => {
      setLoading(!checked);
    };

  const restaurantCoords = [55.7558, 37.6176]; // Координаты ресторана (Москва)
    const userCoords = [55.7602, 37.6175]; // Пример координат пользователя
    const route = [
      [restaurantCoords[0], restaurantCoords[1]],
      [userCoords[0], userCoords[1]],
    ];
  
    const handleOrderSubmit = () => {
      const randomCourier = couriers[Math.floor(Math.random() * couriers.length)];
      setCourier(randomCourier);  
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
  
        
        const duration = 5000; 
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
    }

  const couriers = [
    { name: 'Иван', experience: '2 года', rating: 4.5, reviews: 15 },
  { name: 'Курьер 2', experience: '1 год', rating: 4.0, reviews: 10 },
  { name: 'Курьер 3', experience: '3 года', rating: 5.0, reviews: 20 },
  ]

  const customIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41], 
    iconAnchor: [12, 41],
  });
  



  useEffect(() => {
    refetch();
  
    if (cart.length === 0) {
      setFadeCart(true); 
      const timeout = setTimeout(() => {
        
        if (cart.length === 0) {
          setIsEmpty(true);
        }
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      setFadeCart(false);
      setIsEmpty(false);
    }
  }, [cart, refetch]);
  
  const handleLengthProduct = (itemId, operation) => {
    const updatedCart = [...debouncedCart];
    const itemIndex = updatedCart.findIndex((item) => item.id === itemId);
    const currentQuantity = updatedCart[itemIndex]?.quantity || 1;

    if (operation === "+" && itemIndex !== -1) {
      updatedCart[itemIndex].quantity = currentQuantity + 1;
      addToCartMutation.mutate(updatedCart[itemIndex]);
    } else if (operation === "-" && currentQuantity > 1 && itemIndex !== -1) {
      updatedCart[itemIndex].quantity = currentQuantity - 1;
      addToCartMutation.mutate(updatedCart[itemIndex]);
    }
  };

  
  if (isLoading) {
    return (
      <div className={cartStyle.contain}>
        <div className={cartStyle.cartContainer}>
          <div className={`${cartStyle.skeleton} ${cartStyle.skeletonTitle}`}></div>
          <div className={`${cartStyle.skeleton} ${cartStyle.skeletonDelivery}`}></div>
          {[...Array(3)].map((_, index) => (
            <div key={index} className={`${cartStyle.skeleton} ${cartStyle.skeletonItem}`}></div>
          ))}
        </div>
        <div className={cartStyle.paymentContainer}>
          <div className={`${cartStyle.skeleton} ${cartStyle.skeletonPaymentTitle}`}></div>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className={cartStyle.none}>
        <div className={cartStyle.containNone}>
          <img
            src="https://avatars.mds.yandex.net/get-bunker/56833/a7277bc3645fdbb9c56e6cc23257daf539b038f3/orig"
            alt=""
          />
          <div className={cartStyle.noneFooter}>
            <div className={cartStyle.noneTitle}>Корзина пуста</div>
            <div className={cartStyle.gobBack}>
              <button onClick={() => navigate("/")}>
                <img
                  style={{ width: "18px" }}
                  src="https://cdn-icons-png.flaticon.com/512/507/507257.png"
                  alt=""
                />
                Выбрать ресторан и блюдо
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  
  return (
    <div className={`${cartStyle.contain} ${fadeCart ? cartStyle.fadeOut : ""}`}>
      <div className={cartStyle.cartContainer}>
        <div className={cartStyle.cartTitle}>Корзина:</div>
        <div className={cartStyle.desheds}></div>

        <div className={cartStyle.deliveryInfo}>
          <div className={cartStyle.content}>
            <span className={cartStyle.time}>
              Будет доставлен через: <span style={{ color: "black" }}>1 ч 02 мин</span>
            </span>
            <div className={cartStyle.items}>
              Товаров: <span style={{ color: "black" }}>{cart.length}</span>
            </div>
          </div>
          <div className={cartStyle.cartTotal}>
            Итого:{" "}
            <span className={cartStyle.total}>
              {cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0)} с
            </span>
          </div>
        </div>


        <ul className={cartStyle.cartList}>
          {cart.map((item) => (
            <React.Fragment key={item.id}>
              <li className={cartStyle.cartItem}>
                <div>
                  <img src={item.imageUrl} alt={item.name} className={cartStyle.itemImage} />
                </div>
                <div className={cartStyle.itemInfo}>
                  <div className={cartStyle.titleItem}>
                    <h2>{item.name}</h2>
                    <h4>Вес: {item.weight} гр</h4>
                  </div>
                  <div className={cartStyle.description}>
                    <span>Состав:</span> {item.ingredients || item.description}
                  </div>
                  <div className={cartStyle.itemPrice}>{item.price} с</div>
                </div>
                <div className={cartStyle.funtionItem}>
                  <div className={cartStyle.funtionModal}>
                    <div className={cartStyle.delete}>
                      <div>
                        <img
                          onClick={() => removeFromCartMutation.mutate(item.id)}
                          style={{ width: "36px" }}
                          src="https://img.icons8.com/?size=100&id=99961&format=png&color=4D4D4D"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className={cartStyle.incriment}>
                      <button onClick={() => handleLengthProduct(item.id, "-")} style={{ border: "none" }}>
                        <img
                          style={{ width: "26px", borderRadius: "50%" }}
                          src="https://cdn2.iconfinder.com/data/icons/gaming-and-beyond-part-2-1/80/SubtractFull_gray-512.png"
                          alt=""
                        />
                      </button>
                      <div className={cartStyle.modalValue}>
                        <span>{item.quantity || 1}</span>
                      </div>
                      <button onClick={() => handleLengthProduct(item.id, "+")} style={{ border: "none" }}>
                        <img
                          style={{ width: "26px", borderRadius: "50%" }}
                          src="https://cdn4.iconfinder.com/data/icons/keynote-and-powerpoint-icons/256/Plus-512.png"
                          alt=""
                          />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
              <div className={cartStyle.desheds}></div>
            </React.Fragment>
          ))}
        </ul>

        <div className={cartStyle.cartFooter}>
          <div className={cartStyle.totalPrice}>
            <span>Итоговая стоимость заказа:</span>
          </div>
          <div className={cartStyle.price}>
            {cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0)} с
          </div>
        </div>
      </div>

      <div className={cartStyle.paymentContainer}>
        <h1>Оформление заказа</h1>
        <div className={cartStyle.desheds}></div>
        <p>ЗАПОЛНИТЕ ДАННЫЕ ДЛЯ ДОСТАВКИ</p>
        <form action="">
        <Input placeholder="ФИО" style={{height: '40px', marginBottom: "30px"}} className={cartStyle.Input}/>
        <Input placeholder="Номер телефона" style={{height: '40px' ,marginBottom: "30px"}} className={cartStyle.Input}/>
        <Input placeholder="Улица дом" style={{height: '40px', marginBottom: "30px"}} className={cartStyle.Input} 
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)} />
        <Select
        className={cartStyle.Input}
      defaultValue="Наличные"
      style={{
        width: 361,
        height: 70,
        marginBottom: "30px",
      }}
      options={[
        {
          value: 'Наличные',
          label: 'Наличные',
        },
        {
          value: 'VISA',
          label: 'VISA',
        },
      ]}
    />
     <TextArea rows={4} placeholder="Комментарии к заказу" style={{marginBottom: "50px"}} className={cartStyle.Input}/>
     <Button style={{height: '50px'}} onClick={handleOrderSubmit}   className={cartStyle.Button}>ОФОРМИТЬ ЗАКАЗ</Button>
        </form>
      </div>
      <div>
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
    </div>

  )
}

export default CartPage;