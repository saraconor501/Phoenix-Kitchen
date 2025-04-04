import styles from "./Footer.module.css";
import instagram from '../../assets/follow/instagram.svg';
import fasebook from '../../assets/follow/fasebook.svg';
import twitter from '../../assets/follow/twitter.svg';
const Footer = () => {
  return (
    <>


      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.block}>
            <h1>Phoenix Kitchen</h1>
            <div className={styles.block__wrapper}>
              <div>Подпишись на нас:</div>
              <div><img src={instagram} alt="instagram" /> <img src={fasebook} alt="" /> <img src={twitter} alt="" /></div>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.block__inside}>
            <div>
              <h3>Компания</h3>
              <ul>
                <li>О нас</li>
                <li>Команда</li>
                <li>Карьера</li>
                <li>Ссылки</li>
              </ul>
            </div>

            <div>
              <h3>Контакты</h3>
              <ul>
                <li>Помощь и поддержка</li>
                <li>Сотрудничество с нами</li>
                <li>Поезжайте с нами</li>
                <li>Посмотреть все города</li>
              </ul>
            </div>

            <div>
              <h3>Правовые вопросы</h3>
              <ul>
                <li>Доступность</li>
                <li>Условия использования</li>
                <li>Политика конфиденциальности</li>
                <li>Политика использования файлов cookie</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.reserve}>
          <p>Все права защищены, Phoenix Kitchen</p>
          <p>@saraconor501</p>
        </div>
      </footer>

    </>
  );
};

export default Footer;
