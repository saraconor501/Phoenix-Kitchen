import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Rate } from 'antd';
import Cards from '../../components/ShoopsDetails/Details';
import s from './SearchPage.module.css';
import { useRestaurants } from '../../store/restaurants-slice/restaurants-slice';

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') || '';

  const { data: restaurants, isLoading, error } = useRestaurants();

  const filteredRestaurants = useMemo(() => {
    if (!searchQuery) return restaurants;

    return restaurants
      .map((restaurant) => {
        const filteredProducts = restaurant.menu.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredProducts.length > 0) {
          return {
            ...restaurant,
            menu: filteredProducts, 
          };
        }

        return null;
      })
      .filter(Boolean);
  }, [restaurants, searchQuery]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className={s.SearchContain}>
        <div className={s.SearchContent}>
          {filteredRestaurants.map((restaurant) => (
            <div className={s.SearchItem} key={restaurant.id}>
              <div className={s.Restaurant}>
                <div className={s.ItemLogo}>
                  <img className={s.ItemImg} src={restaurant.image} alt={restaurant.name} />
                </div>
                <div className={s.ItemInfo}>
                  <h2>{restaurant.name}</h2>
                  <h4 style={{ color: 'gray' }}>30 min</h4>
                  <div>
                    <Rate disabled allowHalf defaultValue={restaurant.rating} />
                  </div>
                </div>
              </div>
              <div className={s.Items}>
               
                <Cards
                  restaurantId={restaurant.id}
                  filterCategory="Все"
                  searchQuery={searchQuery}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchPage;