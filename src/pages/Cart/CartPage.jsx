import React, { useEffect, useState } from "react";
import { useCart } from "../../store/cart-slice/cart-slice";
import cartStyle from "./CartPage.module.css";
import { useNavigate } from "react-router-dom";
import { Button, Input, Select, message} from "antd";
import TextArea from "antd/es/input/TextArea";
import CourierModal from "./desing/CourierModal";
import useAuthStore from "../../store/auth-slice/auth-slice";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase-config";

const { Option } = Select;

const CartPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    cart,
    isLoading,
    removeFromCartMutation,
    refetch,
    addToCartMutation,
    clearCartMutation,
  } = useCart();
  const { user } = useAuthStore();
  const [fadeCart, setFadeCart] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "Наличные",
    comments: "",
  });
  const [loading, setLoading] = useState(false);
  const [userCoords, setUserCoords] = useState(null);
  const [isLocationLoading, setIsLocationLoading] = useState(true);

  // Координаты ресторана в Кара-Балте
  const restaurantCoords = [42.8146, 73.8481];

  // Инициализация формы данными пользователя
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        address: user.location?.address || "",
        payment: "Наличные",
        comments: "",
      });
    }
  }, [user]);

  // Отслеживание изменений местоположения в реальном времени
  useEffect(() => {
    if (!user?.uid) return;

    setIsLocationLoading(true);
    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        if (userData.location?.coordinates) {
          setUserCoords([
            userData.location.coordinates.lat,
            userData.location.coordinates.lng,
          ]);
          setFormData((prev) => ({
            ...prev,
            address: userData.location.address || prev.address,
          }));
        }
      }
      setIsLocationLoading(false);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  // Проверка корзины
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      payment: value,
    }));
  };

  const handleLengthProduct = (itemId, operation) => {
    const itemIndex = cart.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) return;

    const currentQuantity = cart[itemIndex].quantity || 1;

    if (operation === "+") {
      addToCartMutation.mutate({
        ...cart[itemIndex],
        quantity: currentQuantity + 1,
      });
    } else if (operation === "-" && currentQuantity > 1) {
      addToCartMutation.mutate({
        ...cart[itemIndex],
        quantity: currentQuantity - 1,
      });
    }
  };

  const handleOrderSubmit = async () => {
    if (!formData.address.trim()) {
      messageApi.error("Пожалуйста, введите адрес доставки");
      return;
    }

    if (!formData.name.trim()) {
      messageApi.error("Пожалуйста, введите ваше имя");
      return;
    }

    if (!formData.phone.trim()) {
      messageApi.error("Пожалуйста, введите номер телефона");
      return;
    }

    if (!userCoords) {
      messageApi.error("Не удалось определить ваше местоположение");
      return;
    }

    setLoading(true);
    setIsModalOpen(true);
    setLoading(false);
  };

  const handleOrderSuccess = () => {
    setIsModalOpen(false);
    clearCartMutation.mutate();
    messageApi.success("Заказ успешно оформлен!");
    navigate("/");
  };

  if (isLoading ) {
    return (
      <div className={cartStyle.contain}>
        <div className={cartStyle.cartContainer}>
          <div className={`${cartStyle.skeleton} ${cartStyle.skeletonTitle}`}></div>
        <div className={`${cartStyle.skeleton} ${cartStyle.skeletonDelivery}`}></div>
          {
      [...Array(3)].map((_, index) => (
        <div key={index} className={`${cartStyle.skeleton} ${cartStyle.skeletonItem}`}></div >
          ))}
        </div >
  <div className={cartStyle.paymentContainer}>
    <div className={`${cartStyle.skeleton} ${cartStyle.skeletonPaymentTitle}`}></div>
        </div >
      </div >
    );
  }

if (isEmpty || fadeCart) {
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

const totalPrice = cart.reduce(
  (total, item) => total + item.price * (item.quantity || 1),
  0
);

return (
  <>
    {contextHolder}
    <div className={`${cartStyle.contain} ${fadeCart ? cartStyle.fadeOut : ""}`}>
    <div className={cartStyle.cartContainer}>
      <div className={cartStyle.cartTitle}>Корзина:</div>
      <div className={cartStyle.desheds}></div>

      <div className={cartStyle.deliveryInfo}>
        <div className={cartStyle.content}>
          <div className={cartStyle.items}>
            Товаров: <span style={{ color: "black" }}>{cart.length}</span>
          </div>
        </div>
        <div className={cartStyle.cartTotal}>
          Итого: <span className={cartStyle.total}>{totalPrice} с</span>
        </div>
      </div>

      <ul className={cartStyle.cartList}>
        {cart.map((item) => (
          <React.Fragment key={item.id}>
            <li className={cartStyle.cartItem}>
              <div className={cartStyle.itemHeader}>
                <div>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className={cartStyle.itemImage}
                  />
                </div>
                <div className={cartStyle.deleteMedia}>
                  <img
                    onClick={() => removeFromCartMutation.mutate(item.id)}
                    style={{ width: "36px" }}
                    src="https://img.icons8.com/?size=100&id=99961&format=png&color=4D4D4D"
                    alt=""
                  />
                </div>
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
                    <button
                      onClick={() => handleLengthProduct(item.id, "-")}
                      style={{ border: "none" }}
                    >
                      <img
                        style={{ width: "26px", borderRadius: "50%" }}
                        src="https://cdn2.iconfinder.com/data/icons/gaming-and-beyond-part-2-1/80/SubtractFull_gray-512.png"
                        alt=""
                      />
                    </button>
                    <div className={cartStyle.modalValue}>
                      <span>{item.quantity || 1}</span>
                    </div>
                    <button
                      onClick={() => handleLengthProduct(item.id, "+")}
                      style={{ border: "none" }}
                    >
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
        <div className={cartStyle.price}>{totalPrice} с</div>
      </div>
    </div>

    <div className={cartStyle.paymentContainer}>
      <h1>Оформление заказа</h1>
      <div className={cartStyle.desheds}></div>

      <form>
        <Input
          name="name"
          placeholder="ФИО"
          value={formData.name}
          onChange={handleInputChange}
          style={{ height: "40px", marginBottom: "30px" }}
          className={cartStyle.Input}
          required
        />
        <Input
          name="phone"
          placeholder="Номер телефона"
          value={formData.phone}
          onChange={handleInputChange}
          style={{ height: "40px", marginBottom: "30px" }}
          className={cartStyle.Input}
          required
        />
        <Input
          name="address"
          placeholder="Улица, дом, квартира"
          value={formData.address}
          onChange={handleInputChange}
          style={{ height: "40px", marginBottom: "30px" }}
          className={cartStyle.Input}
          required
        />
        <Select
          className={cartStyle.Input}
          value={formData.payment}

          onChange={handlePaymentChange}
          style={{ width: "100%", height: "40px", marginBottom: "30px" }}
        >
          <Option value="Наличные">Наличные</Option>
          <Option value="Картой курьеру">Картой курьеру</Option>
          <Option value="Онлайн оплата">Онлайн оплата</Option>
        </Select>
        <TextArea
          name="comments"
          rows={4}
          placeholder="Комментарии к заказу"
          value={formData.comments}
          onChange={handleInputChange}
          style={{ marginBottom: "50px" }}
          className={cartStyle.Input}
        />
        <Button
          type="primary"
          onClick={handleOrderSubmit}
          loading={loading || isLocationLoading}
          disabled={!userCoords}
          style={{ height: "50px", width: "100%" }}
          className={cartStyle.Button}
        >
          {isLocationLoading ? "Проверка адреса..." : "ОФОРМИТЬ ЗАКАЗ"}
        </Button>
      </form>
    </div>

    <CourierModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      userAddress={formData.address}
      userCoords={userCoords}
      restaurantCoords={restaurantCoords}
      cart={cart}
      user={user}
      onOrderSuccess={handleOrderSuccess}
      comments={formData.comments}
      paymentMethod={formData.payment}
      messageApi={messageApi}
    />
  </div >
    </>
  );
};

export default CartPage;