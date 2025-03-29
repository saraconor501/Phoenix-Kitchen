import { useEffect, useRef, useState } from "react";
import { Modal, Button, Skeleton, Spin, message } from "antd";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import L from 'leaflet';
import { doc, updateDoc, arrayUnion, collection, getDocs } from "firebase/firestore";
import { db } from "../../../utils/firebase/firebase-config";
import 'leaflet/dist/leaflet.css';
import '@ant-design/v5-patch-for-react-19';
import ivan from '../../../assets/images/ivan.jpg';


// Фиксированные координаты ресторана в Кара-Балте
const RESTAURANT_COORDS = [42.8146, 73.8481];

const CourierModal = ({
    isOpen,
    onClose,
    userAddress,
    userCoords,
    cart,
    user,
    onOrderSuccess,
    comments,
    paymentMethod,
}) => {
    const [isSearching, setIsSearching] = useState(false);
    const [courier, setCourier] = useState(null);
    const [isCompleting, setIsCompleting] = useState(false);
    const mapRef = useRef(null);
    const [messageApi, contextHolder] = message.useMessage();

    const customIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    const carIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/744/744465.png",
        iconSize: [40, 40],
    });

    const getRandomCourier = async () => {
        try {
            const couriersRef = collection(db, "couriers");
            const snapshot = await getDocs(couriersRef);
            const couriersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            if (couriersList.length === 0) {
                throw new Error("Нет доступных курьеров");
            }

            const availableCouriers = couriersList.filter(c => c.isAvailable);
            const randomCourier = availableCouriers.length > 0
                ? availableCouriers[Math.floor(Math.random() * availableCouriers.length)]
                : couriersList[Math.floor(Math.random() * couriersList.length)];

            return randomCourier;
        } catch (error) {
            console.error("Ошибка при получении курьеров:", error);
            messageApi.error("Ошибка при поиске курьера");
            return null;
        }
    };

    const saveOrderToHistory = async () => {
        const orderData = {
            items: cart.map(item => ({
                id: item.id || null,
                name: item.name || 'Без названия',
                price: item.price || 0,
                quantity: item.quantity || 1,
                imageUrl: item.imageUrl || null
            })),
            total: cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0),
            date: new Date().toISOString(),
            status: "Доставлен",
            address: userAddress || 'Адрес не указан',
            paymentMethod: paymentMethod || 'Не указан',
            comments: comments || null,
            courier: courier ? {
                id: courier.id || null,
                name: courier.name || 'Курьер не указан',
                phone: courier.phone || null
            } : null
        };

        // Удаляем undefined значения
        const cleanOrderData = JSON.parse(JSON.stringify(orderData));

        await updateDoc(doc(db, "users", user.uid), {
            orderHistory: arrayUnion(cleanOrderData)
        });
    };



    const completeOrder = async () => {
        setIsCompleting(true);
        try {
            await saveOrderToHistory();
            await new Promise(resolve => setTimeout(resolve, 1500)); // Имитация загрузки

            onOrderSuccess();
            onClose();
            message.success("Заказ успешно доставлен!");
        } catch (error) {
            messageApi.error("Ошибка при завершении заказа");
            console.error(error);
        } finally {
            setIsCompleting(false);
        }
    };

    useEffect(() => {
        if (isOpen && !courier && !isSearching) {
            setIsSearching(true);

            const searchCourier = async () => {
                try {
                    const foundCourier = await getRandomCourier();

                    if (foundCourier) {
                        setCourier(foundCourier);
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsSearching(false);
                }
            };

            const timer = setTimeout(searchCourier, 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <>
            {contextHolder}
            <Modal
                open={isOpen}
                onCancel={!isCompleting ? onClose : null}
                footer={null}
                width={800}
                closable={!isCompleting}
                destroyOnClose
                className="courier-modal"
            >
                <div style={{ position: 'relative' }}>
                    {isCompleting && (
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            zIndex: 1000,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}>
                            <Spin size="large" />
                            <p style={{ color: 'white', marginTop: 20 }}>Завершаем заказ...</p>
                        </div>
                    )}

                    <h3>{isSearching ? "Поиск курьера" : "Ваш курьер"}</h3>

                    {isSearching ? (
                        <div>
                            <p>Идет поиск курьера...</p>
                            <div style={{ textAlign: "center" }}>
                                <Skeleton active avatar paragraph={{ rows: 4 }} />
                            </div>
                        </div>
                    ) : courier ? (
                        <div>
                          
                            <div style={{ display: "flex", gap: "20px", marginBottom: "20px", marginTop: "10px",height:'100px' }}>
                                <img
                                    src={ivan}
                                    alt={courier.name}
                                    style={{ width: "100px", borderRadius: "50%",objectFit:"cover" }}
                                />
                                <div style={{fontWeight:"500"}}>
                                    <h4>{courier.name}</h4>
                                    <p>Стаж: {courier.experience}</p>
                                    <p>Рейтинг: {courier.rating}/5</p>
                                    <p>Транспорт: {courier.vehicle || "Автомобиль"}</p>
                                </div>
                            </div>

                            <div style={{ height: "400px", marginBottom: 20 }}>
                                <MapContainer
                                    center={RESTAURANT_COORDS}
                                    zoom={13}
                                    style={{ height: "100%", width: "100%" }}
                                    whenCreated={mapInstance => { mapRef.current = mapInstance }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={RESTAURANT_COORDS} icon={customIcon}>
                                        <Popup>Ресторан (Кара-Балта)</Popup>
                                    </Marker>
                                    <Marker position={userCoords} icon={customIcon}>
                                        <Popup>Ваш адрес: {userAddress}</Popup>

                                    </Marker>
                                    <Marker position={RESTAURANT_COORDS} icon={carIcon}>
                                        <Popup>Курьер: {courier.name}</Popup>
                                    </Marker>
                                    <Polyline
                                        positions={[RESTAURANT_COORDS, userCoords]}
                                        color="blue"
                                        weight={3}
                                    />
                                </MapContainer>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                                <Button onClick={onClose}>
                                    Закрыть
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={completeOrder}
                                    loading={isCompleting}
                                >
                                    Завершить доставку
                                </Button>
                            </div>
                        </div>
                    ) : null}
                </div>
            </Modal>
        </>
    );
};

export default CourierModal;