import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRestaurantStore from "../../store/restaurants-slice/useRestaurantsStore";
import Cards from "../../components/ShoopsDetails/Details";
import r from "./RestaurantPage.module.css";
import f from "../../assets/images/f.svg";
import time from "../../assets/images/timeD.svg";
import rating from "../../assets/images/ratingD.svg";
import { useRestaurants } from "../../store/restaurants-slice/restaurants-slice";


const RestaurantPage = () => {
  const { id } = useParams();
  const { data: restaurants, isLoading } = useRestaurants();
  const { selectedRestaurant, setSelectedRestaurant } = useRestaurantStore();
  const [activeModal, setActiveModal] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    if (restaurants) {
      const restaurant = restaurants.find((r) => r.id === id);
      setSelectedRestaurant(restaurant || null);
    }
  }, [restaurants, id, setSelectedRestaurant]);

  const handleFilterChange = (category) => {
    setIsFiltering(true);
    setTimeout(() => {
      setActiveCategory(category);
      setIsFiltering(false);
    }, 350);
  };

  if (!selectedRestaurant && !isLoading) return <div>Ресторан не найден</div>;

  return (
    <>
      <div className={r.contaninBanner}>
        {isLoading ? (
          <div className={r.skeletonBanner}></div> 
        ) : (
          <div
            style={{ backgroundImage: `url(${selectedRestaurant.image})` }}
            className={r.banner}
          >
            <div className={r.Name}>
              <h1>{selectedRestaurant.name}</h1>
            </div>

            <div className={r.content}>
              <div className={r.timeDelivery}>
                <div>
                  <div>
                    <img src={time} className={r.img} alt="Delivery Time" />
                  </div>
                  <div className={r.info}>
                    <div className={r.e}>
                      {selectedRestaurant.deliveryTime}
                      <span className={r.e2}>min</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={r.Rating}>
                <div>
                  <div>
                    <img src={rating} className={r.img} alt="Rating" />
                  </div>
                  <div className={r.info}>
                    <div className={r.e}>{selectedRestaurant.rating}</div>
                  </div>
                </div>
              </div>

              <div
                className={r.Info}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveModal(activeModal === "info" ? null : "info");
                }}
              >
                <img style={{ width: "42px" }} src={f} alt="Info" />
                {activeModal === "info" && (
                  <div className={r.modal}>
                    <p>Дополнительная информация о ресторане</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={r.fiterContain}>
        <div>
          {isLoading ? (
            <>
              <div className={r.skeletonFilterNav}></div>
              <div className={r.skeletonFilterNav}></div>
              <div className={r.skeletonFilterNav}></div>
              <div className={r.skeletonFilterNav}></div>
              <div className={r.skeletonFilterNav}></div>
              <div className={r.skeletonFilterNav}></div>
            </>
          ) : (
            <>
              <div
                className={`${r.filterNav} ${activeCategory === "Все" ? r.active : ""}`}
                onClick={() => handleFilterChange("Все")}
              >
                Все
              </div>
              {Array.isArray(selectedRestaurant?.filterItems) &&
                selectedRestaurant?.filterItems.map((item, index) => (
                  <div
                    className={`${r.filterNav} ${activeCategory === item ? r.active : ""}`}
                    key={index}
                    onClick={() => handleFilterChange(item)}
                  >
                    {item}
                  </div>
                ))}
            </>
          )}
        </div>
      </div>


      <div className={`${r.ProductGrid} ${isFiltering ? r.filtering : ""}`}>
        {isLoading ? (
          <div></div>
        ) : (
          <Cards restaurantId={id} filterCategory={activeCategory} />
        )}
      </div>
    </>
  );
};

export default RestaurantPage;
