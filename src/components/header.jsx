import pandaLogo from "../assets/header_panda.png";
import "../css/header.css";
function Header() {
  return (
    <header>
      <a href="/" className="logo">
        <img src={pandaLogo} alt="판다마켓" />
      </a>
      <a href="/login" className="loginButton">
        로그인
      </a>
    </header>
  );
}

export default Header;
