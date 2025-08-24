import style from './Headline.module.css';
import HomeTopImg from '../../../images/home_top_img.svg';

function Headline() {
  return (
    <div className={style.headlineSectionBg}>
      <div className={style.headlineSection}>
        <div className={style.headlineTitle}>
          <h1>
            일상의 모든 물건을<br />
            거래해 보세요
          </h1>
          <a href="/items" className={style.headlineButton}>구경하러 가기</a>
        </div>
        <img src={HomeTopImg} alt="HomeTop" className={style.headlineImage} />
      </div>
    </div>
  );
}

export default Headline;
