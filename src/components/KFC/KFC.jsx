    
import { useEffect } from "react";
import useProducts from "../../store/products-slice/kfc-slice";
import styles from "./KFC.module.css";

const KFC = () => {
  const { products, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();

  }, [fetchProducts]);

  return (
    <>

      <div className={styles.productsGrid}>
        {products.map((item, index) => (
          <div key={index} className={styles.productBlock}>
                <div className={styles.card}>
      <img
        src={item.imageUrl}
        alt="Баскет М Комбо"
        className={styles.image}
      />
      <div className={styles.content}>
        <h2 className={styles.title}>{item.name}</h2>
        <p className={styles.description}>
          {item.description}
        </p>
        <button className={styles.button}>{item.price}c</button>
      </div>
    </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default KFC