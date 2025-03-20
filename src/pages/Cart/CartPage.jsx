
import React, { useEffect, useState } from "react";
import { useCart } from "../../store/cart-slice/cart-slice";
import cartStyle from "./CartPage.module.css";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, isLoading, removeFromCartMutation, refetch, addToCartMutation } = useCart();
  const [fadeCart, setFadeCart] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [debouncedCart, setDebouncedCart] = useState(cart);
  const navigate = useNavigate();


  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedCart(cart);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [cart]);

  useEffect(() => {
    refetch();
  
    if (cart.length === 0) {
      setFadeCart(true); // Начинаем анимацию исчезновения
      const timeout = setTimeout(() => {
        // Проверяем, что корзина всё ещё пуста перед установкой isEmpty
        if (cart.length === 0) {
          setIsEmpty(true);
        }
      }, 1000); // Задержка для плавного перехода
  
      // Очищаем таймер при изменении корзины
      return () => clearTimeout(timeout);
    } else {
      setFadeCart(false);
      setIsEmpty(false); // Сразу сбрасываем isEmpty, если корзина не пуста
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
        <form action=""></form>
      </div>
    </div>
  );
};

export default CartPage;