import styles from './SearchFood.module.css';
import pizza from '../../../public/images/pizza.svg'
import burger from '../../../public/images/burger.svg'

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
          <img src={pizza} alt="" />
        </div>
        <div className={styles.block}>
          <img src={pizza} alt="" />
        </div>
      </div>
    </>
  )
}

export default SearchFood