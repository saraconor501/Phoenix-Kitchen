import { memo } from 'react';
import { Rate } from 'antd';
import main from "../Details.module.css";
import cartIcon from "../../../assets/images/toCartIcon.svg";
import save from "../../../assets/images/icon-save.svg";
import location from "../../../assets/images/product-icon.svg";


const ProductCard = memo(({ item, isSaved, onSaveProduct, onAddToCart, onOpenModal }) => {
  return (
    <div className={main.productCard}>
      <div className={main.imageContainer} onClick={() => onOpenModal(item)}>
        <img
          style={{ width: item.restauran === 'Navat' || item.restauran === 'Kulikov' ? "100%" : 'auto', cursor: "pointer" }}
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
          <div className={main.ratingContent}>
            <Rate disabled allowHalf defaultValue={item?.rating} />
          </div>
        </div>
        <h2 className={main.productName}>{item.name}</h2>
        <div className={main.titleProduct}>
          <p className={main.deliveryTime}>
            <img style={{ width: "30px" }} src="https://cdn-icons-png.flaticon.com/512/1023/1023346.png" />
            Вес: {item.weight} г
          </p>
          <div className={main.restaurantName}>
            <img src={location} /> {item.restauran || "Not restaurant"}
          </div>
        </div>
        <p className={main.price}>{parseInt(item.price)} coм</p>
        <div className={main.buttons}>
          <button className={main.saveButton} onClick={() => onSaveProduct(item)}>
            <img
              style={{ width: isSaved ? "20px" : 'auto' }}
              src={isSaved ? "https://cdn-icons-png.flaticon.com/512/7093/7093762.png" : save}
              alt="save"
            />
            {isSaved ? "Сохранено" : "Сохранить"}
          </button>
          <button className={main.addToCartButton} onClick={() => onAddToCart(item)}>
            <img src={cartIcon} alt="cart" /> В корзину
          </button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard'; 

export default ProductCard;