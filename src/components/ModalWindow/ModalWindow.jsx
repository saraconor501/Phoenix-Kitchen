import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./ModalWindow.module.css";
import { useCart } from "../../store/cart-slice/cart-slice";

const ModalWindow = ({ product, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [count, setCount] = useState(1);

  const { addToCartMutation } = useCart();

  useEffect(() => {
    if (product) {
      setIsVisible(true);
      document.body.classList.add("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [product]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
      setIsClosing(false);
      document.body.classList.remove("no-scroll");
    }, 300);
  };

  const handleWrapperClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleLengthProduct = (operation) => {
    setCount((prev) => (operation === "+" ? prev + 1 : Math.max(1, prev - 1)));
  };

  const handleAddToCart = () => {
    addToCartMutation.mutate({ ...product, quantity: count }); 
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ""}`}
      onClick={handleWrapperClick}
    >
      <div
        className={`${styles.modalContainer} ${isClosing ? styles.modalClosing : ""}`}
      >
        <div className={styles.panel}>
          <div className={styles.TopContent}>
            <div>
              <img
                className={styles.image}
                src={Array.isArray(product.imageUrl) ? product.imageUrl[0] : product.imageUrl}
                alt={product.name}
              />
            </div>
            <div className={styles.TitleSlise}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div className={styles.title}>{product.name}</div>
                </div>
                <div>
                  <div style={{ width: "100%" }} className={styles.closeIcon}>
                    <button style={{ border: "none", background: "transparent" }} onClick={handleClose}>
                      <img
                        className={styles.closeModale}
                        style={{ width: "26px" }}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRcgl60WxmPhOLIzMcuMZfktKr3oazFSbzyw&s"
                        alt="Закрыть"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.description}>{product.ingredients || product.description}</div>
                <div className={styles.deshed}></div>
                <div className={styles.modalFlex}>
                  <div className={styles.weight}>Вес: {product.weight ? `${product.weight} г` : "N/A"}</div>
                  <div className={styles.price}>{product.price} сом</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.desheds}></div>

          <div className={styles.modalFooter}>
            <div className={styles.increments}>
              <div className={styles.funtionModal}>
                <button onClick={() => handleLengthProduct("-")} style={{ border: "none" }}>
                  <img
                    style={{ width: "28px", borderRadius: "50%" }}
                    src="https://cdn2.iconfinder.com/data/icons/gaming-and-beyond-part-2-1/80/SubtractFull_gray-512.png"
                    alt="Уменьшить"
                  />
                </button>

                <div className={styles.modalValue}>{count}</div>


                <button onClick={() => handleLengthProduct("+")} style={{ border: "none" }}>
                  <img
                    style={{ width: "28px", borderRadius: "50%" }}
                    src="https://cdn4.iconfinder.com/data/icons/keynote-and-powerpoint-icons/256/Plus-512.png"
                    alt="Увеличить"
                  />
                </button>
              </div>
            </div>
            <div className={styles.modalBy}>
              <button className={styles.modalBtn} onClick={handleAddToCart}>
                В КОРЗИНУ {product.price * count} с
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalWindow.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
    ingredients: PropTypes.string,
    description: PropTypes.string,
    weight: PropTypes.number,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalWindow;