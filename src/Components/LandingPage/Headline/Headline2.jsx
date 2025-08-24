import style from './Headline.module.css';
import HomeDownImg from '../../../images/home_bottom_img.svg';

function Headline2() {
  return (
    <div className={style.headlineSectionBg}>
      <div className={style.headlineSection}>
        <div className={style.headlineTitle}>
          <h1>
            믿을 수 있는<br />
            판다 마켓 중고 거래
          </h1>
        </div>
        <img src={HomeDownImg} alt="HomeDownImg" />
      </div>
    </div>
  )
}

export default Headline2;
