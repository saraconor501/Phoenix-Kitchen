import Hamburger from '../../assets/images/Hamburger.svg';
import s from './AboutUs.module.css';
const AboutUs = () => {
  return (
    <>
      <div className={s.containTitle}>
        <h1 className={s.resTitle}>О нас</h1>
      </div>
        <div className={s.about}>
      <div className={s.item}>
        <div className={s.text}>
          <p>
            <strong>PHOENIX KITCHEN</strong> - это веб сайт сервисов ресторанов и доставки еды по городу Кара-Балта
            Проект разработан на ReactJs при сборщике Vite.
            Проект предназначен для туристов и жителей Кыргызстана, которые хотят получить информацию о достопримечательностях и исторических местах городов Кыргызстана.
          Цель проекта : Создать веб-приложение для доставки еды из ресторанов города Кара-Балта ,
          Чуйской Области.
            Местположение ресторанов показывается на карте Leaflet. 
          На сайте присутсвует система поисков курьеров , оформление заказов, а также поиск и фильтрация ресторанов.
          </p>
        </div>
        <div className={s.imageContainer}>
          <img src={Hamburger} alt="Изображение" className={s.image} />
        </div>
      </div>
    </div>
    </>
  )
}

export default AboutUs