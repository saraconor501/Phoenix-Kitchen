import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from './SearchFood.module.css';
import burger from '../../assets/images/burger.jpg';
import pizza from '../../assets/images/pizza.jpg';
import chicken from '../../assets/images/chicken.jpg';
import dessert from '../../assets/images/dessert.jpg';
import meat from '../../assets/images/meat.webp';
import drinks from '../../assets/images/drinks.jpg';
import Cards from "../ShoopsDetails/Details";

const foodCategories = [
  { id: 1, name: 'Пицца', image: pizza },
  { id: 2, name: 'Бургеры', image: burger },
  { id: 3, name: 'Курица', image: chicken },
  { id: 4, name: 'Десерты', image: dessert },
  { id: 5, name: 'Мясо', image: meat },
  { id: 6, name: 'Напитки', image: drinks }
];

const SearchFood = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
      setActiveCategory(null);
    } else {
      setSelectedCategory(categoryName);
      setActiveCategory(categoryName);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.resTitle}>Разделы по еде</h1>

      <div className={styles.contentFilter}>
        {foodCategories.map((category) => (
          <div
            key={category.id}
            className={`${styles.block} ${activeCategory === category.name ? styles.active : ''}`}
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className={styles.imageContainer}>
              <img
                src={category.image}
                alt={category.name}
                className={styles.foodImage}
              />
              <div className={styles.textOverlay}>{category.name}</div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedCategory && (
          <motion.div
            key={selectedCategory}
            className={styles.filteredProductsContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
           
            <motion.div
              className={styles.productsGrid}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: 0.6, staggerChildren: 0.2 }
                }
              }}
            >
              <Cards
                restaurantId={null}
                filterCategory={selectedCategory}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchFood;