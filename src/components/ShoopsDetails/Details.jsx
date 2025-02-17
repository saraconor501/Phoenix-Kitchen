
import React, { useEffect } from 'react';
import useProducts from '../../store/products-slice/products-slice';
import main from './Cards.module.css';
import { Skeleton } from 'antd';
import CardSkeleton from '../Card-Skeleton/Card-Skeleton';

const Cards = () => {
  const { products, fetchProducts, isLoading, error } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className={main.productsGrid}>
        {isLoading? 
            Array.from({ length: 6 }).map((_, index) => <CardSkeleton key={index} />)
          : 
            products.map((item, index) => (
              <div key={index} className={main.productCard}>
                <div className={main.imageContainer}>
                  <img style={{ width: 'auto' }} src={item.imageUrl} alt={item.name} />
                  {item.isAvailable && (
                    <div className={main.statusBadge}>
                      <div className={main.open}></div> Open
                    </div>
                  )}
                  {!item.isAvailable && (
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
                      <img
                        style={{ width: '30px' }}
                        src="https://cdn-icons-png.flaticon.com/512/1023/1023346.png"
                      />{' '}
                      Вес: {item.weight} г
                    </p>
                    <p className={main.restaurantName}>
                      <img src="/images/product-icon.svg" /> {item.restauran || 'Not restauran'}
                    </p>
                  </div>
                  <p className={main.price}>{item.price} coм</p>
                  <div className={main.buttons}>
                    <button className={main.saveButton}>
                      <img src="/images/icon-save.svg" /> Save for later
                    </button>
                    <button className={main.addToCartButton}>Add to cart</button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default Cards;