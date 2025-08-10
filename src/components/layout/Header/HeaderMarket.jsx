// src/components/layout/Header/HeaderMarket.jsx
import "../../../styles/global/global.css";
import "./HeaderMarket.css";
import Button from "../../atom/Button/Button";  // 상대 경로로 수정!

function HeaderMarket() {
  return (
    <header className="nav">
      <div className="nav-container">
        <div className="leftSection">
          <a href="/" className="header-logo-link">
            <img
              className="pandaMarketLogo"
              src="/images/pandalogo-sm.svg"
              alt="Panda Market"
            />
            <p className="header-txt">판다마켓</p>
          </a>
          
          <nav className="navMenu">
            <a className="navMenuCommunity" href="/community">자유게시판</a>
            <a className="navMenuPreOwned" href="/items">중고마켓</a>
          </nav>
        </div>
        
        <Button 
          href="/login" 
          variant="primary" 
          size="medium"
        >
          로그인
        </Button>
      </div>
    </header>
  );
}

export default HeaderMarket;