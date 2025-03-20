import { useState } from "react";
import { getAuth } from "firebase/auth"; // Импортируем Firebase Authentication
import { useProducts } from "../../store/products-slice/products-slice";
import main from "./Details.module.css";
import CardSkeleton from "../Card-Skeleton/Card-Skeleton";
import ModalWindow from "../ModalWindow/ModalWindow";
import save from "../../assets/images/icon-save.svg";
import cartIcon from "../../assets/images/toCartIcon.svg";
import location from "../../assets/images/product-icon.svg";
import { message } from 'antd';

const Cards = ({ restaurantId }) => {
  
  
  const { data: products, isLoading, error } = useProducts(restaurantId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const auth = getAuth();  
  const [messageApi, contextHolder] = message.useMessage(); 

  const openModal = (product) => {
    if (!auth.currentUser) {  
      messageApi.open({
        type: 'warning',
        content: 'Для добавления в корзину или просмотра товара, пожалуйста, зарегистрируйтесь',
      });
      return;
    }
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    if (!auth.currentUser) { 
      messageApi.open({
        type: 'warning',
        content: 'Для добавления в корзину или просмотра товара, пожалуйста, зарегистрируйтесь.',
      });
      return;
    }
    openModal(product);
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  

  return (
    <>
      {contextHolder}
      <div className={main.productsGrid}>
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => <CardSkeleton key={index} />)
          : products.map((item) => (
            <div key={item.id} className={main.productCard}>
              <div className={main.imageContainer} onClick={() => openModal(item)}>
                <img
                  style={{ width: item.restauran !== 'Navat' ? "auto" : '100%', cursor: "pointer" }}
                  src={item.imageUrl}
                  alt={item.name}
                />
                {item.isAvailable ? (
                  <div className={main.statusBadge}>
                    <div className={main.open}></div> Открыто
                  </div>
                ) : (
                  <div className={main.statusBadgeNone}>
                    <div className={main.close}></div> Закрыто
                  </div>
                )}
              </div>

              <div className={main.productInfo}>
                <div className={main.rating}>
                  <span className={main.star}>⭐️</span>
                  <span>{item?.rating}</span> {item.isAvailable ? "Dining & Delivery" : "Dining"}
                </div>
                <h2 className={main.productName}>{item.name}</h2>
                <div className={main.titleProduct}>
                  <p className={main.deliveryTime}>
                    <img
                      style={{ width: "30px" }}
                      src="https://cdn-icons-png.flaticon.com/512/1023/1023346.png"
                    />
                    Вес: {item.weight} г
                  </p>
                  <div className={main.restaurantName}>
                    <img src={location} /> {item.restauran || "Not restaurant"}
                  </div>
                </div>
                <p className={main.price}>{item.price} coм</p>
                <div className={main.buttons}>
                  <button className={main.saveButton}>

                    <img src={save} alt="save" /> Сохранить
                  </button>
                  <button className={main.addToCartButton} onClick={() => handleAddToCart(item)}>
                    <img src={cartIcon} alt="cart" /> в корзину
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {isModalOpen && selectedProduct && (
        <ModalWindow product={selectedProduct} onClose={closeModal} />
      )}
    </>
  );
};

export default Cards;