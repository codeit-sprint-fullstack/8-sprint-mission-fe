import { Link } from "react-router-dom";
import pandaLogo from "../assets/header_panda.png";
import "../css/header.css";

function Header() {
  return (
    <header>
      <div className="header-left">
        <Link to="/" className="brand">
          <img src={pandaLogo} alt="판다마켓 로고" />
        </Link>
        <nav className="nav-menu">
          <Link to="/board">자유게시판</Link>
          <Link to="/market">중고마켓</Link>
        </nav>
      </div>
      <Link to="/login" className="loginButton" id="login">
        로그인
      </Link>
    </header>
  );
}

export default Header;
