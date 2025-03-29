import { Link } from "react-router-dom";
import { Rate } from "antd";

import { useRestaurants } from "../../store/restaurants-slice/restaurants-slice";
import sp from "./Restauraunts.module.css";
import SkeletonSearch from "../SkeletonSearch/SkeletonSearch";
const Restauraunts = () => {
  const { data: restaurants, isLoading } = useRestaurants();

  return (
    <>
      <div className={sp.containTitle}>
        <h1 className={sp.resTitle}>Рестораны</h1>
      </div>
      <div className={sp.container}>
        <div className={sp.content}>
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className={sp.skeletonWrapper}>
                <SkeletonSearch width={'100%'} height={'220px'}>

                </SkeletonSearch>
                </div>
              ))
            : restaurants.map((restaurant) => (
                <div key={restaurant.id} className={sp.cardWrapper}>
                  <Link to={`/restaraunts/${restaurant.id}`} className={sp.link}>
                    <div className={sp.card}>
                      <div className={sp.cardImageContainer}>
                        <img src={restaurant.image} alt={restaurant.name} className={sp.cardImage} />
                        <div className={sp.deliveryTime}>
                          <span>{restaurant?.deliveryTime} минут</span>
                        </div>
                      </div>
                      <div className={sp.cardContent}>
                        <div className={sp.cardHeader}>
                          <h3 className={sp.cardTitle}>{restaurant.name}</h3>
                          <div className={sp.rating}>
                            <Rate 
                              disabled 
                              allowHalf 
                              defaultValue={restaurant.rating} 
                              style={{ fontSize: 14 }} 
                            />
                            <span className={sp.ratingValue}>{restaurant.rating}</span>
                          </div>
                        </div>
                        <div className={sp.cardInfo}>
                          <div className={sp.cuisineType}>
                            {restaurant?.categories?.map((item,)=> `${item}, `)}
                          </div>
                          <div className={sp.cardDetails}>
                            <div className={sp.detailItem}>
                              <span className={sp.detailLabel}>Адрес:</span> 
                              <span className={sp.addressItem}>{restaurant.address}</span>
                            </div>
                            <div className={sp.detailItem}>
                              <span className={sp.detailLabel}><img style={{width:"14px"}} src='https://cdn-icons-png.flaticon.com/512/15894/15894919.png' alt="" /></span>
                              <span className={sp.phoneItem}>{restaurant.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Restauraunts;