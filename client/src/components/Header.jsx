import { Link } from "react-router-dom";
import pandaLogo from "../assets/pandaLogo.svg";
import "../styles/Header.css";

function Header() {
  return (
    <div className="header">
      <div className="nav">
        <Link to="/">
          <img src={pandaLogo} alt="pandaLogo" />
        </Link>
        <div className="navMenu">
          <div>자유게시판</div>
          <div>중고마켓</div>
        </div>
      </div>
      <button>로그인</button>
    </div>
  );
}

export default Header;
