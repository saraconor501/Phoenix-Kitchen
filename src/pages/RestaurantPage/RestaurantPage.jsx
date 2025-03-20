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

  useEffect(() => {
    if (restaurants) {
      const restaurant = restaurants.find((r) => r.id === id);
      setSelectedRestaurant(restaurant || null);
    }
  }, [restaurants, id, setSelectedRestaurant]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${r.modal}`, `.${r.Info}`)) {
        setActiveModal(null);
      }
    };

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (isLoading) return <div>Загрузка...</div>;
  if (!selectedRestaurant) return <div>Ресторан не найден</div>;

  return (
    <>
      <div className={r.contaninBanner}>
        <div
          style={{ backgroundImage: `url(${selectedRestaurant.image})` }}
          className={r.banner}
        >
          <div className={r.Name}>
            <h1>{selectedRestaurant.name}</h1>
          </div>

          <div className={r.content}>

            <div
              className={r.timeDelivery}>
              <div>
                <div><img src={time} className={r.img} /></div>
                <div className={r.info}>
                  <div className={r.e}>{selectedRestaurant.deliveryTime}<span className={r.e2}>min</span></div>
                </div>
              </div>
            </div>

            <div className={r.Rating}>
              <div>
                <div><img src={rating} className={r.img} /></div>
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
              <img style={{ width: "42px" }} src={f} />
              {activeModal === "info" && (
                <div className={r.modal}>
                  <p>Дополнительная информация о ресторане</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={r.fiterContain}>
        <div>
          {Array.isArray(selectedRestaurant?.filterItems) && selectedRestaurant?.filterItems.map((item, index) => (
            <div className={r.filterNav} key={index}>{item}</div>
          ))}
        </div>
      </div>

      <div className={r.ProductGrid}>
        <Cards restaurantId={id} />
      </div>
    </>
  );
};

export default RestaurantPage;