import  { useState, useEffect } from 'react';
import styles from './ModalWindow.module.css';

const ModalWindow = ({ product, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (product) {
      setIsVisible(true);
    }
  }, [product]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose(); // Закрываем модалку через родительский обработчик
      setIsClosing(false);
    }, 300) 
  };

  const handleWrapperClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ''}`}
      onClick={handleWrapperClick}
    >
      <div className={`${styles.wrapper} ${isClosing ? styles.wrapperClosing : ''}`}>
        <div className={`${styles.modalContainer} ${isClosing ? styles.modalClosing : ''}`}>
          <div className={styles.panel}>
            <div className={styles.title}>{product.name}</div>
            <img
              className={styles.image}
              src={product.imageUrl[0]}
              alt={product.name}
            />
            <div className={styles.description}>{product.ingredients}</div>
            <div className={styles.price}>{product.price} coм</div>
            <div className={styles.actions}>
              <button onClick={handleClose} className={styles.close}>Close</button>
              <button className={styles.addToCart}>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;