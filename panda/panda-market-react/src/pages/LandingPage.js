import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import facebook from '../assets/facebook.svg';
import twitter from '../assets/twitter.svg';
import youtube from '../assets/youtube.svg';
import instagram from '../assets/instagram.svg';

export default function LandingPage() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">
            <img src={logo} alt="홈" width="153" />
          </Link>
          <Link to="/login" id="loginLinkButton" className="button">로그인</Link>
        </nav>
      </header>

      <main>
        <section id="hero" className="banner">
          <div className="wrapper">
            <h1>
              일상의 모든 물건을<br />
              거래해 보세요
            </h1>
            <Link to="/home" className="button pill-button">구경하러 가기</Link>
          </div>
        </section>

        <section id="features" className="wrapper">
          <div className="feature">
            <img src="/images/home/feature1-image.svg" alt="인기상품" width="50%" />
            <div className="feature-content">
              <h2 className="feature-tag">Hot item</h2>
              <h1>인기 상품을<br />확인해 보세요</h1>
              <p className="feature-description">
                가장 HOT한 중고거래 물품을<br />판다마켓에서 확인해 보세요
              </p>
            </div>
          </div>

          <div className="feature">
            <div className="feature-content">
              <h2 className="feature-tag">Search</h2>
              <h1>구매를 원하는<br />상품을 검색하세요</h1>
              <p className="feature-description">
                구매하고 싶은 물품은 검색해서
                <br />쉽게 찾아보세요
              </p>
            </div>
            <img src="/images/home/feature2-image.svg" alt="검색" width="50%" />
          </div>

          <div className="feature">
            <img src="/images/home/feature3-image.svg" alt="판매상품" width="50%" />
            <div className="feature-content">
              <h2 className="feature-tag">Register</h2>
              <h1>판매를 원하는<br />상품을 등록하세요</h1>
              <p className="feature-description">
                어떤 물건이든 판매하고 싶은 상품을
                <br />쉽게 등록하세요
              </p>
            </div>
          </div>
        </section>

        <section id="bottomBanner" className="banner">
          <div className="wrapper">
            <h1>
              믿을 수 있는
              <br />
              판다마켓 중고거래
            </h1>
          </div>
        </section>
      </main>

      <footer>
        <div>©codeit - 2024</div>
        <div id="footerMenu">
          <a href="/privacy.html">Privacy Policy</a>
          <a href="/faq.html">FAQ</a>
        </div>
        <div id="socialMedia">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img src={facebook} alt="페이스북" width="20" />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <img src={twitter} alt="트위터" width="20" />
          </a>
          <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer">
            <img src={youtube} alt="유튜브" width="20" />
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="인스타" width="20" />
          </a>
        </div>
      </footer>
    </>
  );
}