import style from './infoCard.module.css';
import homeImg_1 from '../../../images/home_img_01.svg';
import homeImg_2 from '../../../images/home_img_02.svg';
import homeImg_3 from '../../../images/home_img_03.svg';

function InfoCard() {
  return (
    <section>
      <div className={style.sectionBg}>
        <div className={style.infoCard}>
          <img src={homeImg_1} alt="homeImg_1"/>
          <div className={style.titleBox}>
            <p className={style.blueIc}>Hot item</p>
            <div className={style.title}>
              <h1>
                인기 상품을<br />
                확인해보세요
              </h1>
              <p>
                가장 HOT한 중고거래 물품을<br />
                판다 마켓에서 확인해 보세요
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={style.sectionBg}>
        <div className={style.infoCard}>
          <div className={style.titleBox}>
            <p className={style.blueIc}>Search</p>
            <div className={style.title}>
              <h1>
                구매를 원하는<br />
                상품을 검색하세요
              </h1>
              <p>
                구매하고 싶은 물품은 검색해서<br />
                쉽게 찾아 보세요
              </p>
            </div>
          </div>
          <img src={homeImg_2} alt="homeImg_2"/>
        </div>
      </div>

      <div className={style.sectionBg}>
        <div className={style.infoCard}>
          <img src={homeImg_3} alt="homeImg_3"/>
          <div className={style.titleBox}>
            <p className={style.blueIc}>Register</p>
            <div className={style.title}>
              <h1>
                판매를 원하는<br />
                상품을 등록하세요
              </h1>
              <p>
                어떤 물건이든 판매하고 싶은 상품을<br />
                쉽게 등록하세요
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfoCard;

// 이미지 위치랑 글만 바꿔서 랜딩할 수 있게 변수화..?