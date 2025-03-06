import styles from './Papajonhs.module.css'
import CardSkeleton from '../Card-Skeleton/Card-Skeleton'
import { useEffect, useState } from 'react';
import useProducts from '../../store/products-slice/papajonhs';
// import save from '../../assets/images/save.svg'

const Papajonhs = () => {
    const { products, fetchProducts, isLoading, error } = useProducts();
    const [save,setSave]=useState(false)

    const ChangeImageSave=()=>{
      if (save) {
        setSave(false)
      }
      else{
        setSave(true)
      }
    }

    useEffect(() => {
        fetchProducts();
      }, [fetchProducts]);
    
      if (error) {
        return <div className={styles.error}>{error}</div>;
      }
  return (
    <>
        <div className={styles.productsGrid}>
      {isLoading
        ? Array.from({ length: 8 }).map((_, index) => <CardSkeleton key={index} />)
        : products.map((item, index) => (
            <div key={index} className={styles.productCard}>
              <div className={styles.imageContainer} style={{justifyContent:item.category[0]=='Pizza'?'start':'center'}}>
                <img src={item.imageUrl} alt={item.name} style={{width:"220px",}} />
                {item.isAvailable ? (
                  <div className={styles.statusBadge}>
                    <div className={styles.open}></div> Open
                  </div>
                ) : (
                  <div className={styles.statusBadgeNone}>
                    <div className={styles.close}></div> Close
                  </div>
                )}
              </div>

              <div className={styles.productInfo}>
                <div className={styles.rating}>
                  <span className={styles.star}>⭐️</span>
                  <span style={{color: !item.rating?"red":'black'}}>{item?.rating || "(No rating)"}</span>{"  "}
                  {item.isAvailable ? "Dining & Delivery" : "  Dining"}
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
                  <button className={styles.saveButton} onClick={ChangeImageSave}>
                    {/* <img  src={save?'https://cdn-icons-png.flaticon.com/512/7093/7093762.png': } style={{width:save?'18px':"12px"}} alt="save" /> Save for later */}
                  </button>
                  <button className={styles.addToCartButton}><img src="/images/toCartIcon.svg" alt="cart" /> Add to cart</button>
                </div>
              </div>
            </div>
          ))}
    </div>
    </>
  )
}

export default Papajonhs