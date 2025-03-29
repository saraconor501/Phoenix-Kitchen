import { useMemo } from "react";
import { useRestaurants } from "../../store/restaurants-slice/restaurants-slice";
import Cards from "../ShoopsDetails/Details";
import n from './mainProducts.module.css';

const MainProducts = () => {
    const { data: restaurants, isLoading } = useRestaurants();
    
    // Массив категорий для отображения
    const categories = [
        { title: "Новинки", category: "Новое" },
        { title: "Хиты продаж", category: "Хиты" },
        { title: "Комбо наборы", category: "Комбо" }
    ];

    // Получаем все ID ресторанов
    const restaurantIds = useMemo(() => {
        return restaurants?.map(restaurant => restaurant.id) || [];
    }, [restaurants]);

    return (
        <div className={n.mainProducts}>
            {categories.map(({ title, category }) => (
                <div key={category} className={n.categorySection}>
                    <h2 className={n.categoryTitle}>{title}</h2>
                    <div className={n.productsGrid}>
                        {isLoading ? (
                            // Скелетоны во время загрузки
                            <>
                                <div className={n.skeletonCard}></div>
                                <div className={n.skeletonCard}></div>
                                <div className={n.skeletonCard}></div>
                            </>
                        ) : (
                            // Передаём undefined как restaurantId, чтобы Cards сам фильтровал все рестораны
                            <Cards 
                                restaurantId={undefined}
                                filterCategory={category}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MainProducts;