import { Link } from "react-router-dom";
import { Skeleton, Rate } from "antd";
import { useRestaurants } from "../../store/restaurants-slice/restaurants-slice";
import sp from "./Restauraunts.module.css";

const Restauraunts = () => {
  const { data: restaurants, isLoading } = useRestaurants();

  return (
    <>
      <h1 className={sp.resTitle}>Рестораны</h1>
      <div className={sp.container}>
        <div className={sp.content}>
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className={sp.skeletonWrapper}>
                  <Skeleton.Image
                    active
                    style={{ width: "100%", height: "210px" }}
                    className={sp.skeletonImage}
                  />
                  <div className={sp.skeletonText}>
                   
                    <Skeleton title={false} paragraph={{ rows: 1, width: "60%" }} active />
                    <Skeleton title={false} paragraph={{ rows: 1, width: "80%" }} active />
                  </div>
                </div>
              ))
            : restaurants.map((restaurant) => (
                <Link to={`/restaraunts/${restaurant.id}`} className={sp.link} key={restaurant.id}>
                  <div className={sp.block__wrapper}>
                    <img src={restaurant.image} alt={restaurant.name} />
                    <div className={sp.sub__block}>
                      <div >
                        <Rate disabled allowHalf defaultValue={restaurant.rating} />
                      </div>
                      <h4>{restaurant.name}</h4>
                      <h5>{restaurant.address}</h5>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </>
  );
};

export default Restauraunts;