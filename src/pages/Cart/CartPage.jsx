import { useEffect } from "react";
import { useCart } from "../../store/cart-slice/cart-slice";
import cartStyle from "./CartPage.module.css";

const CartPage = () => {
  const { cart, isLoading, addToCartMutation, removeFromCartMutation, refetch } = useCart();

  useEffect(() => {

    refetch();
  }, [refetch]);

  const handleLengthProduct = (itemId, operation) => {
    if (operation === "+") {
      addToCartMutation.mutate({ ...cart.find(item => item.id === itemId), quantity: 1 });
    } else if (operation === "-") {
      const item = cart.find(item => item.id === itemId);
      if (item.quantity > 1) {
        addToCartMutation.mutate({ ...item, quantity: -1 });
      } 
    }
  };

  if (isLoading) {
    return <div className={cartStyle.loading}>Загрузка...</div>;
  }

  return (
    <div className={cartStyle.contain}>
      <div className={cartStyle.cartContainer}>
        <div className={cartStyle.cartTitle}>
          Корзина:
        </div>

        <div className={cartStyle.desheds}></div>

        <div className={cartStyle.deliveryInfo}>
          <div className={cartStyle.content}>
            <span className={cartStyle.time}>Будет доставлен через: <span style={{ color: 'black' }}>1 ч 02 мин</span></span>
            <div className={cartStyle.items}>Товаров: <span style={{ color: 'black' }}>{cart.length}</span></div>
          </div>
          <div className={cartStyle.cartTotal}>Итого: <span className={cartStyle.total}>{cart.reduce((total, item) => total + item.price * item.quantity, 0)} с</span></div>
        </div>

        <ul className={cartStyle.cartList}>
          {cart.map((item) => (
            <>
              <li key={item.id} className={cartStyle.cartItem}>
                <div>
                  <img src={item.imageUrl} alt={item.name} className={cartStyle.itemImage} />
                </div>
                <div className={cartStyle.itemInfo}>
                  <div className={cartStyle.titleItem}>
                    <h2>{item.name}</h2>
                    <h4>Вес: {item.weight} гр</h4>
                  </div>
                  <div className={cartStyle.description}><span>Состав:</span> {item.ingredients || item.description}</div>
                  <div className={cartStyle.itemPrice}>{item.price} с</div>
                </div>
                <div className={cartStyle.funtionItem}>
                  <div className={cartStyle.funtionModal}>
                    <div className={cartStyle.delete}>
                      <div><img onClick={() => removeFromCartMutation.mutate(item.id)} style={{ width: "36px" }} src="https://img.icons8.com/?size=100&id=99961&format=png&color=4D4D4D" alt="" /></div>
                    </div>
                    <div className={cartStyle.incriment}>
                      <button onClick={() => handleLengthProduct(item.id, '-')} style={{ border: "none" }}>
                        <img style={{ width: "26px", borderRadius: "50%" }} src="https://cdn2.iconfinder.com/data/icons/gaming-and-beyond-part-2-1/80/SubtractFull_gray-512.png" alt="" />
                      </button>

                      <div className={cartStyle.modalValue}><span>{item.quantity}</span></div>

                      <button onClick={() => handleLengthProduct(item.id, '+')} style={{ border: "none" }}>
                        <img style={{ width: "26px", borderRadius: "50%" }} src="https://cdn4.iconfinder.com/data/icons/keynote-and-powerpoint-icons/256/Plus-512.png" alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
              <div className={cartStyle.desheds}></div>
            </>
          ))}
        </ul>


        <div className={cartStyle.cartFooter}>
          <div className={cartStyle.totalPrice}>
            <span>Итоговая стоимость заказа:</span>
          </div>
          <div className={cartStyle.price}>{cart.reduce((total, item) => total + item.price * item.quantity, 0)} с</div>
        </div>

      </div>

      <div className={cartStyle.paymentContainer}>
        {/* Здесь можно добавить информацию для оформления оплаты */}
      </div>
    </div>
  );
};

export default CartPage;