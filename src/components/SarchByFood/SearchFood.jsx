import styles from './SearchFood.module.css';
import burger from '../../assets/images/burger.jpg';
import pizza from '../../assets/images/pizza.jpg';
import chicken from '../../assets/images/chicken.jpg';
import dessert from '../../assets/images/dessert.jpg';

const SearchFood = () => {
  return (
    <>
      <h1 className={styles.resTitle}>Разделы по еде</h1>
      <div className={styles.container}>
        <div className={styles.block}>
          <img src={pizza} alt="" />
        </div>
        <div className={styles.block}>
          <img src={burger} alt="" />
        </div>
        <div className={styles.block}>
          <img src={chicken} alt="" />
        </div>
        <div className={styles.block}>
          <img src={dessert} alt="" />
        </div>
      </div>
    </>
  )
}

export default SearchFood