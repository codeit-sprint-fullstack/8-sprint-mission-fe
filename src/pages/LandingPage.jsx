import { Link } from "react-router-dom";
import "../css/landing.css";

import lookImg from "../assets/Img_Landing_look.png";
import hotImg from "../assets/Img_Landing_hot.png";
import searchImg from "../assets/Img_Landing_search.png";
import registerImg from "../assets/Img_Landing_register.png";
import bottomImg from "../assets/Img_Landing_bottom.png";

export default function LandingPage() {
  return (
    <div className="landing">
      <section id="sect_tr" className="sect">
        <div className="banner_text">
          <h1>
            일상의 모든 물건을 <br />
            거래해 보세요
          </h1>
          <Link to="/items" id="lookaround">
            구경하러 가기
          </Link>
        </div>
        <img src={lookImg} alt="구경하는 이미지" id="look_img" />
      </section>

      <section className="feature">
        <div id="hot" className="feat">
          <img src={hotImg} alt="인기 상품" />
          <div className="feat_text">
            <h2>Hot item</h2>
            <h1>
              인기 상품을 <br /> 확인해 보세요
            </h1>
            <p>
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>

        <div id="search" className="feat">
          <div id="search" className="feat_text">
            <h2>Search</h2>
            <h1>
              구매를 원하는 <br /> 상품을 검색하세요
            </h1>
            <p>
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
          <img src={searchImg} alt="검색" />
        </div>

        <div id="register" className="feat">
          <img src={registerImg} alt="상품 등록" />
          <div className="feat_text">
            <h2>Register</h2>
            <h1>
              판매를 원하는
              <br />
              상품을 등록하세요
            </h1>
            <p>
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>

      <section id="sect_tr" className="sect">
        <div className="banner_text">
          <h1>
            믿을 수 있는 <br />
            판다마켓 중고 거래
          </h1>
        </div>
        <img src={bottomImg} alt="중고거래" id="look_img" />
      </section>
    </div>
  );
}
