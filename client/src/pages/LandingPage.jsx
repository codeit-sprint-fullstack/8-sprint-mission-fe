import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

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
        <Link className="logoIMG" to="/">
          <img src={pandaFace} alt="pandaFace" />
          <img className="logoText" src={logoText} alt="logoText" />
        </Link>
        <Link className="loginButton" to="/login">
          로그인
        </Link>
      </header>
      <main>
        <section className="topBanner">
          <div className="wrapper">
            <div className="detail">
              <div className="title">일상의 모든 물건을 거래해 보세요</div>
              <Link to="items">구경하러 가기</Link>
            </div>
            <img src={topImage} alt="topImage" />
          </div>
        </section>
        <section className="section1">
          <div className="wrapper">
            <img src={imgSection1} alt="section1Img" />
            <div className="detail">
              <div className="tag">Hot Item</div>
              <div className="title-text">
                <div className="title">인기상품을 확인해 보세요</div>
                <div className="text">
                  가장 HOT한 중고거래 물품을
                  <br />
                  판다 마켓에서 확인해 보세요
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section2">
          <div className="wrapper">
            <div className="detail">
              <div className="tag">Search</div>
              <div className="title-text">
                <div className="title">구매를 원하는 상품을 검색하세요</div>
                <div className="text">
                  구매하고 싶은 물품은 검색해서
                  <br />
                  쉽게 찾아보세요
                </div>
              </div>
            </div>
            <img src={imgSection2} alt="section2Img" />
          </div>
        </section>
        <section className="section3">
          <div className="wrapper">
            <img src={imgSection3} alt="section3Img" />
            <div className="detail">
              <div className="tag">Register</div>
              <div className="title-text">
                <div className="title">판매를 원하는 상품을 등록하세요</div>
                <div className="text">
                  어떤 물건이든 판매하고 싶은 상품을
                  <br />
                  쉽게 등록하세요
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bottomBanner">
          <div className="wrapper">
            <div className="text">
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
