import pandaLogo from "../assets/header_panda.png";
import "../css/header.css";

function Header() {
  return (
    <header>
      <div className="header-left">
        <a href="/" className="brand">
          <img src={pandaLogo} alt="판다마켓 로고" />
        </a>
        <nav className="nav-menu">
          <a href="/board">자유게시판</a>
          <a href="/">중고마켓</a>
        </nav>
      </div>
      <a href="/login" className="loginButton">
        로그인
      </a>
    </header>
  );
}

export default Header;
