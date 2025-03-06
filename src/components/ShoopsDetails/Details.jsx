import { useEffect, useState } from 'react';
import useProducts from '../../store/products-slice/products-slice';
import main from './Details.module.css';
import CardSkeleton from '../Card-Skeleton/Card-Skeleton';
import ModalWindow from '../ModalWindow/ModalWindow';
// import save from '../../assets/images/save.svg'
const Cards = () => {
  const { products, fetchProducts, isLoading, error } = useProducts();
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
    return <div>{error}</div>;
  }



  return (
    <>
      <div className={main.productsGrid}>
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => <CardSkeleton key={index} />)
          : products.map((item) => (
            <div key={item.id} className={main.productCard}>
              <div className={main.imageContainer} onClick={() => openModal(item)}>
                <img
                  style={{ width: 'auto', cursor: 'pointer' }}
                  src={item.imageUrl}
                  alt={item.name}
                />
                {item.isAvailable ? (
                  <div className={main.statusBadge}>
                    <div className={main.open}></div> Open
                  </div>
                ) : (
                  <div className={main.statusBadgeNone}>
                    <div className={main.close}></div> Close
                  </div>
                )}
              </div>

              <div className={main.productInfo}>
                <div className={main.rating}>
                  <span className={main.star}>⭐️</span>
                  <span>{item?.rating}</span> {item.isAvailable ? 'Dining & Delivery' : 'Dining'}
                </div>
                <h2 className={main.productName}>{item.name}</h2>
                <div className={main.titleProduct}>
                  <p className={main.deliveryTime}>
                    <img style={{ width: '30px' }} src="https://cdn-icons-png.flaticon.com/512/1023/1023346.png" />
                    Вес: {item.weight} г
                  </p>
                  <div className={main.restaurantName}>
                    <img src="/images/product-icon.svg" /> {item.restauran || 'Not restaurant'}
                  </div>
                </div>
                <p className={main.price}>{item.price} coм</p>
                <div className={main.buttons}>
                  <button className={main.saveButton}>
                    {/* <img src={save} /> Save for later */}
                  </button>
                  <button className={main.addToCartButton} onClick={() => openModal(item)}>Add to cart</button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {isModalOpen && selectedProduct && (
        <ModalWindow
          product={selectedProduct}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default Cards;