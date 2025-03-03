import { useEffect, useState } from "react";
import styles from './Navat.module.css'
import useNavat from "../../store/products-slice/navat-slice";
import CardSkeleton from '../../components/Card-Skeleton/Card-Skeleton';
import ModalWindow from '../ModalWindow/ModalWindow'
const Navat = () => {
const { products, fetchProducts, isLoading, error } = useNavat();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }
  return (
    <>
        <div className={styles.productsGrid}>
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => <CardSkeleton key={index} />)
          : products.map((item, index) => (
              <div key={index} className={styles.productCard} onClick={() => openModal(item)}>
                <div className={styles.imageContainer}>
                  <img src={item.imageUrl} alt={item.name}/>
                  {item.isAvailable ? (
                    <div className={styles.statusBadge}>
                      <div className={styles.open}></div> Открыть
                    </div>
                  ) : (
                    <div className={styles.statusBadgeNone}>
                      <div className={styles.close}></div> Закрыть
                    </div>
                  )}
                </div>

                <div className={styles.productInfo}>
                  <div className={styles.rating}>
                    <span className={styles.star}>⭐️</span>
                    <span style={{ color: !item.rating ? "red" : "black" }}>
                      {item?.rating || "No rating"}
                    </span>{" "}
                    {item.isAvailable ? "Dining & Delivery" : "Dining"}
                  </div>
                  <h2 className={styles.productName}>{item.name}</h2>
                  <div className={styles.titleProduct}>
                    <p className={styles.deliveryTime}>
                      <img
                        style={{ width: "30px" }}
                        src="https://cdn-icons-png.flaticon.com/512/1023/1023346.png"
                        alt="weight"
                      />{" "}
                      Вес: {item.weight || "N/A"} г
                    </p>
                    <p className={styles.restaurantName}>
                      <img src="/images/product-icon.svg" alt="restaurant" />{" "}
                      {item.restauran || "Not restaurant"}
                    </p>
                  </div>
                  <p className={styles.price}>{item.price} coм</p>
                  <div className={styles.buttons}>
                    <button className={styles.saveButton}>
                      <img src="/images/icon-save.svg" alt="save" /> Сохранить
                    </button>
                    <button className={styles.addToCartButton}><img src="/images/toCartIcon.svg" alt="cart" /> в корзину</button>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {isModalOpen && selectedProduct && (
        <ModalWindow product={selectedProduct} onClose={closeModal} />
      )}
    </>
  )
}

export default Navat