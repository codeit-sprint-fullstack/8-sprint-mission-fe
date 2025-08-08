import "../../../styles/global/global.css";
import "./Header.css";

function Header() {
  return (
    <header className="nav">
      <div className="nav-container">
        <a href="/" className="header-logo-link">
          <img
            className="pandaMarketLogo"
            src="./images/pandalogo-sm.svg"
            alt="Panda Market"
          />
          <p className="header-txt">판다마켓</p>
        </a>
        <a href="login.html" className="login-btn">
          로그인
        </a>
      </div>
    </header>
  );
}

export default Header;
