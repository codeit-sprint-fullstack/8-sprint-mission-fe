import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Items from "./pages/Items.jsx";

import "./styles/reset.css";
import "./styles/style.css";
import "./styles/responsive.css";

// export default function App() {
//   return (
//     <>
//       <main>
//         <ProductSection
//           title="베스트 상품"
//           defaultSort="favorite"
//           showToolbar={false}
//           cols={{ desktop: 4, tablet: 2, mobile: 1 }}
//           limit={4}
//         />
//         <ProductSection
//           title="판매 중인 상품"
//           defaultSort="latest"
//           showToolbar={true}
//           cols={{ desktop: 5, tablet: 3, mobile: 2 }}
//           pageSizeMap={{ desktop: 10, tablet: 6, mobile: 4 }}
//         />
//       </main>
//     </>
//   );
// }

function Landing() {
  return (
    <div>
      <header>
        <div className="frame">
          <Link className="logo" to="/">
            <img src="/images/logo_panda.png" alt="판다마켓 로고" />
          </Link>
          <Link className="login" to="/login">
            <div className="login_button">로그인</div>
          </Link>
        </div>
      </header>

      <main>
        <div className="total_section">
          <div className="mini_header">
            <div className="minii_header">
              <div className="header_background">
                <div className="header_layout">
                  <div className="panda_header">
                    <div className="first_layout">
                      <h1 className="mini_ment">
                        일상의 모든 물건을<br />거래해 보세요
                      </h1>
                      <Link className="button_layout" to="/items">
                        <div className="button_ment">구경하러 가기</div>
                      </Link>
                    </div>
                  </div>
                  <img
                    className="main_panda"
                    src="/images/Img_home_top.png"
                    alt="메인판다"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="section_total">
            <img
              className="section_one"
              src="/images/Img_home_01.png"
              alt="인기상품"
            />
            <div className="one_content">
              <div className="one_content_section">
                <h3 className="content_one">Hot item</h3>
                <h4 className="content_two">
                  인기 상품을<br />확인해 보세요
                </h4>
                <h5 className="content_three">
                  가장 HOT한 중고거래 물품을<br />
                  판다 마켓에서 확인해 보세요
                </h5>
              </div>
            </div>
          </div>

          <div className="section_total">
            <div className="section_one">
              <div className="two_content">
                <div className="two_content_section">
                  <h3 className="content_search">Search</h3>
                  <h4 className="content_two">
                    구매를 원하는<br />상품을 검색하세요
                  </h4>
                  <h5 className="content_three">
                    구매하고 싶은 물품은 검색해서<br />
                    쉽게 찾아보세요
                  </h5>
                </div>
                <img
                  className="one_img_total"
                  src="/images/Img_home_02.png"
                  alt="상품검색"
                />
              </div>
            </div>
          </div>

          <div className="section_total">
            <div className="section_one">
              <img
                className="one_img_total"
                src="/images/Img_home_03.png"
                alt="상품등록"
              />
              <div className="one_content">
                <div className="one_content_section">
                  <h3 className="content_one">Register</h3>
                  <h4 className="content_two">
                    판매를 원하는<br />상품을 등록하세요
                  </h4>
                  <h5 className="content_three">
                    어떤 물건이든 판매하고 싶은 상품을<br />
                    쉽게 등록하세요
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div className="bottom_total">
            <div className="bottom_blueback"></div>
            <div className="bottom_layout">
              <div className="ment_layout">
                <h4 className="bottom_ment">
                  믿을 수 있는<br />판다마켓 중고 거래
                </h4>
              </div>
              <img
                className="bottom_img"
                src="/images/Img_home_bottom.png"
                alt="하단배너판다"
              />
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="footer_total">
          <p className="footer_codeit">©codeit - 2024</p>
          <div className="footer_layout">
            <Link to="/privacy" className="footer_ment">
              Privacy Policy
            </Link>
            <Link to="/faq" className="footer_ment">
              FAQ
            </Link>
          </div>
          <div className="icon_layout">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <img className="icon_img" src="/images/ic_facebook.png" alt="페이스북 아이콘" />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer">
              <img className="icon_img" src="/images/ic_twitter.png" alt="트위터 아이콘" />
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <img className="icon_img" src="/images/ic_youtube.png" alt="유튜브 아이콘" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <img className="icon_img" src="/images/ic_instagram.png" alt="인스타그램 아이콘" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import Registration from "./pages/Registration.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/items" element={<Items />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
}