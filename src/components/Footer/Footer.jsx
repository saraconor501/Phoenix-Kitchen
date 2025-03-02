import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h2>Phoenix Kitchen</h2>
        </div>

        <div className={styles.links}>
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

        <div className={styles.social}>
          <h3>Подписывайтесь на нас:</h3>
          <div className={styles.icons}>
            <img src="/images/facebook.svg" alt="Facebook" />
            <img src="/images/twitter.svg" alt="Twitter" />
            <img src="/images/instagram.svg" alt="Instagram" />
          </div>
        </div>
      </div>

      <div className={styles.bottomText}>
        <p>Все права защищены, Phoenix Kitchen 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
