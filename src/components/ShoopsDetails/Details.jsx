
import { useEffect } from "react";
import useProducts from "../../store/products-slice/products-slice";
import main from "./Details.module.css";

const Cards = () => {
  const { products, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();

  }, [fetchProducts]);

  return (
    <>

      <div className={main.productsGrid}>
        {products.map((item, index) => (
          <div key={index} className={main.productCard}>

            <div className={main.imageContainer}>
              <img src={item.imageUrl} alt={item.name} />
              {item.isAvailable && <div className={main.statusBadge}><div className={main.open}></div> Open</div>}
              {!item.isAvailable && <div className={main.statusBadgeNone}><div className={main.close}></div> Close</div>}
              {console.log(item.isAvailable)}
            </div>

            <div className={main.productInfo}>
              <div className={main.rating}>
                <span className={main.star}>⭐</span>
                <span>{item.rating || "4.7"}</span> Dining & Delivery
              </div>
              <h2 className={main.productName}>{item.name}</h2>
              <div className={main.titleProduct}>
              <p className={main.deliveryTime}> <img style={{ width: '30px' }} src="https://cdn-icons-png.flaticon.com/512/1023/1023346.png" /> Вес:  {item.weight} г</p>

                <p className={main.restaurantName}>
                  <img src="/images/product-icon.svg" /> {item.restauran || "Pizza Heaven"}
                </p>
        
              </div>

              <p className={main.price}>${item.price}</p>
              <div className={main.buttons}>
                <button className={main.saveButton}>Save for later</button>
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
