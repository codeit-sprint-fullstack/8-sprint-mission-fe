import "../../../styles/global/global.css";
import "./HeaderMarket.css";

function HeaderMarket() {
  return (
    <header className="nav">
      <div className="nav-container">
        <div className="navLeftSession">
          <a href="/" className="header-logo-link">
            <img
              className="pandaMarketLogo"
              src="./images/pandalogo-sm.svg"
              alt="Panda Market"
            />
            <p className="header-txt">판다마켓</p>
          </a>
          <div className="navMenu">
              <nav className="market-nav">
              <a className="navMenuCommunity" href="/community">자유게시판</a>
              <a className="navMenuPreOwned" href="/items">중고마켓</a>
            </nav>
          </div>
        </div>
        <a href="login.html" className="login-btn">
          로그인
        </a>
      </div>
    </header>
  );
}

export default HeaderMarket;
