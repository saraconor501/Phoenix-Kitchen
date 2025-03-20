import React, { useEffect, useState } from "react";
import { useCart } from "../../store/cart-slice/cart-slice";
import cartStyle from "./CartPage.module.css";
import { useNavigate } from "react-router-dom";
import { Button, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import ivan from '../../assets/images/ivan.jpg';

const CartPage = () => {
  const couriers = [
    {
      id: 1,
      name: "Иван",
      experience: "5 лет",
      rating: 4.8,
      avatar: ivan,
    },
    {
      id: 2,
      name: "Чынгыз",
      experience: "5 лет",
      rating: 5.0,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Ерик",
      experience: "2 года",
      rating: 4.5,
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
    },
  ]
  const handleOrder = () => {
    if (cart.length === 0) return;

    const randomCourier = couriers[Math.floor(Math.random() * couriers.length)];
    setCourier(randomCourier);
    setTimeLeft(Math.floor(Math.random() * 30) + 20); // случайное время 20-50 минут
    setIsModalVisible(true);
  };


  const [courier, setCourier] = useState(null);
  const { cart, isLoading, removeFromCartMutation, refetch, addToCartMutation } = useCart();
  const [fadeCart, setFadeCart] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);


  useEffect(() => {
    refetch();
    if (cart.length === 0) {
      setFadeCart(true);
      setTimeout(() => setIsEmpty(true), 500);
    } else {
      setFadeCart(false);
      setIsEmpty(false);
    }
  }, [cart, refetch]);
  
  const handleLengthProduct = (itemId, operation) => {
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((item) => item.id === itemId);
    const currentQuantity = updatedCart[itemIndex].quantity || 1;

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
              {cart.reduce(
                (total, item) => total + item.price * (item.quantity || 1),
                0
              )}{" "}
              с
            </span>
          </div>
        </div>

        <ul className={cartStyle.cartList}>
          {cart.map((item) => (
            <React.Fragment key={item.id}>
              <li className={cartStyle.cartItem}>
                <div>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className={cartStyle.itemImage}
                  />
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
            {cart.reduce(
              (total, item) => total + item.price * (item.quantity || 1),
              0
            )}{" "}
            с
          </div>
        </div>
      </div>

      <div className={cartStyle.paymentContainer}>
        <h1>Оформление заказа</h1>
        <div className={cartStyle.desheds}></div>
        <p>ЗАПОЛНИТЕ ДАННЫЕ ДЛЯ ДОСТАВКИ</p>
        <form action="">
        <Input placeholder="ФИО" style={{height: '40px', marginBottom: "30px"}}/>
        <Input placeholder="Номер телефона" style={{height: '40px' ,marginBottom: "30px"}}/>
        <Input placeholder="Улица дом" style={{height: '40px', marginBottom: "30px"}}/>
        <Select
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
     <TextArea rows={4} placeholder="Комментарии к заказу" style={{marginBottom: "50px"}}/>
     <Button style={{height: '50px'}} onClick={handleOrder}>ОФОРМИТЬ ЗАКАЗ</Button>
        </form>
      </div>
      <div>
<Modal width={1000}   visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
{courier ? (
  <div className={cartStyle.modal__wrapper}>
    <p className={cartStyle.title}>Ваш заказ уже в пути!</p>
    <span>Ваш курьер:</span>
    <div className={cartStyle.modal__block}>
    <img src={courier.avatar} alt={courier.name} width="200" style={{ borderRadius: "50%" }} />
    </div>
    <h3>{courier.name}</h3>
    <div className={cartStyle.wrapper}>
    <p>Стаж: {courier.experience}</p>
    <p>Рейтинг: ⭐{courier.rating}</p>
    </div>
    <h3>Товары в доставке:</h3>
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <img src={item.imageUrl} alt={item.name} width="40" /> {item.name} - {item.quantity || 1} шт.
                </li>
              ))}
            </ul>
    <h4>Прибытие через: {timeLeft} мин</h4>
    </div>
) : (
  <p>Поиск курьера...</p>
)}
  </Modal> 
</div>
    </div>

  )
}

export default CartPage;