import { Link } from "react-router-dom";
import styles from "../styles/LandingPage.module.scss";

import pandaFace from "../assets/pandaFace.svg";
import logoText from "../assets/logoText.svg";
import topImage from "../assets/img_home_top.svg";
import imgSection1 from "../assets/section1_img.svg";
import imgSection2 from "../assets/section2_img.svg";
import imgSection3 from "../assets/section3_img.svg";
import bottomImage from "../assets/img_home_bottom.svg";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div>
      <header>
        <Link className={styles.logoIMG} to="/">
          <img src={pandaFace} alt="pandaFace" />
          <img className={styles.logoText} src={logoText} alt="logoText" />
        </Link>
        <Link className={styles.loginButton} to="/login">
          로그인
        </Link>
      </header>
      <main>
        <section className={styles.topBanner}>
          <div className={styles.wrapper}>
            <div className={styles.detail}>
              <div className={styles.title}>
                일상의 모든 물건을 거래해 보세요
              </div>
              <Link to="items">구경하러 가기</Link>
            </div>
            <img src={topImage} alt="topImage" />
          </div>
        </section>
        <section className={styles.section1}>
          <div className={styles.wrapper}>
            <img src={imgSection1} alt="section1Img" />
            <div className={styles.detail}>
              <div className={styles.tag}>Hot Item</div>
              <div className={styles.titleText}>
                <div className={styles.title}>인기상품을 확인해 보세요</div>
                <div className={styles.text}>
                  가장 HOT한 중고거래 물품을
                  <br />
                  판다 마켓에서 확인해 보세요
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.section2}>
          <div className={styles.wrapper}>
            <div className={styles.detail}>
              <div className={styles.tag}>Search</div>
              <div className={styles.titleText}>
                <div className={styles.title}>
                  구매를 원하는 상품을 검색하세요
                </div>
                <div className={styles.text}>
                  구매하고 싶은 물품은 검색해서
                  <br />
                  쉽게 찾아보세요
                </div>
              </div>
            </div>
            <img src={imgSection2} alt="section2Img" />
          </div>
        </section>
        <section className={styles.section3}>
          <div className={styles.wrapper}>
            <img src={imgSection3} alt="section3Img" />
            <div className={styles.detail}>
              <div className={styles.tag}>Register</div>
              <div className={styles.titleText}>
                <div className={styles.title}>
                  판매를 원하는 상품을 등록하세요
                </div>
                <div className={styles.text}>
                  어떤 물건이든 판매하고 싶은 상품을
                  <br />
                  쉽게 등록하세요
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.bottomBanner}>
          <div className={styles.wrapper}>
            <div className={styles.text}>
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </div>
            <img src={bottomImage} alt="bottomImg" />
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default LandingPage;
