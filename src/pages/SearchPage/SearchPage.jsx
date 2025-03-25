import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Rate } from 'antd';
import Cards from '../../components/ShoopsDetails/Details';
import s from './SearchPage.module.css';
import { useRestaurants } from '../../store/restaurants-slice/restaurants-slice';
import SkeletonSearch from '../../components/SkeletonSearch/SkeletonSearch';
const SearchPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('query') || '';
    const [showNotFound, setShowNotFound] = useState(false);
    const { data: restaurants, isLoading, error } = useRestaurants();
    const [displayedRestaurants, setDisplayedRestaurants] = useState([]);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const filteredRestaurants = useMemo(() => {
        if (!searchQuery) return restaurants || [];

        return (restaurants || [])
            .map((restaurant) => {
                const isRestaurantMatch = restaurant.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

                const filteredProducts = restaurant.menu.filter((product) =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase())
                );

                if (isRestaurantMatch) {
                    return {
                        ...restaurant,
                        menu: restaurant.menu
                    };
                }

                if (filteredProducts.length > 0) {
                    return {
                        ...restaurant,
                        menu: filteredProducts
                    };
                }

                return null;
            })
            .filter(Boolean);
    }, [restaurants, searchQuery]);

    useEffect(() => {
        if (filteredRestaurants.length === 0 && !searchQuery) {
            setDisplayedRestaurants(restaurants || []);
            return;
        }

        setIsTransitioning(true);
        const timer = setTimeout(() => {
            setDisplayedRestaurants(filteredRestaurants);
            setIsTransitioning(false);

         
            if (filteredRestaurants.length === 0 && searchQuery) {
                const notFoundTimer = setTimeout(() => {
                    setShowNotFound(true);
                }, 3000);
                return () => clearTimeout(notFoundTimer);
            } else {
                setShowNotFound(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [filteredRestaurants, searchQuery, restaurants]);

    if (isLoading) {
        return (
            <div className={s.SearchContain}>
                <div className={s.SearchContent}>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className={s.SearchItem}>
                            <div className={s.Restaurant}>
                                <SkeletonSearch width="80px" height="80px" borderRadius="20px" />
                                <div className={s.ItemInfo}>
                                    <SkeletonSearch width="150px" height="20px" borderRadius="5px" />
                                    <SkeletonSearch width="100px" height="15px" borderRadius="5px" />
                                    <SkeletonSearch width="120px" height="20px" borderRadius="5px" />
                                </div>
                            </div>
                            <div className={s.Items}>
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <SkeletonSearch key={i} width="100%" height="150px" borderRadius="10px" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={s.SearchContain}>
            <div className={s.SearchContent}>
                {displayedRestaurants.map((restaurant) => (
                    <div
                        className={`${s.SearchItem} ${isTransitioning ? s.fadeOut : s.fadeIn}`}
                        key={restaurant.id}
                    >
                        <div className={s.Restaurant}>
                            <div className={s.ItemLogo}>
                                <img className={s.ItemImg} src={restaurant.image} alt={restaurant.name} />
                            </div>
                            <div className={s.ItemInfo}>
                                <h2>{restaurant.name}</h2>
                                <h4 style={{ color: 'gray' }}>30 минута</h4>
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
                {displayedRestaurants.length === 0 && (
                    <>
                        {showNotFound ? (
                            <>
                                <h2 className={s.not}>По запросу <span style={{ color: "black" }}>{searchQuery}</span> ничего не найдено</h2>
                                <div className={s.noResults}>
                                    <div>
                                        <img src=''alt="" />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={s.SearchItem}>
                                    <div className={s.Restaurant}>
                                        <SkeletonSearch width="80px" height="80px" borderRadius="20px" />
                                        <div className={s.ItemInfo}>
                                            <SkeletonSearch width="150px" height="20px" borderRadius="5px" />
                                            <SkeletonSearch width="100px" height="15px" borderRadius="5px" />
                                            <SkeletonSearch width="120px" height="20px" borderRadius="5px" />
                                        </div>
                                    </div>
                                    <div className={s.Items}>
                                        {Array.from({ length: 4 }).map((_, i) => (
                                            <SkeletonSearch key={i} width="100%" height="150px" borderRadius="10px" />
                                        ))}
                                    </div>
                                </div>
                                <div className={s.SearchItem}>
                                    <div className={s.Restaurant}>
                                        <SkeletonSearch width="80px" height="80px" borderRadius="20px" />
                                        <div className={s.ItemInfo}>
                                            <SkeletonSearch width="150px" height="20px" borderRadius="5px" />
                                            <SkeletonSearch width="100px" height="15px" borderRadius="5px" />
                                            <SkeletonSearch width="120px" height="20px" borderRadius="5px" />
                                        </div>
                                    </div>
                                    <div className={s.Items}>
                                        {Array.from({ length: 4 }).map((_, i) => (
                                            <SkeletonSearch key={i} width="100%" height="150px" borderRadius="10px" />
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div >
    );
};

export default SearchPage;