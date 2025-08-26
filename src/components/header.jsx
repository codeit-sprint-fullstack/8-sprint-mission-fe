import { Link, NavLink } from "react-router-dom";
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
          <Link to="/board" className="nav-item">
            자유게시판
          </Link>
          {/* NavLink를 사용 함으로 현재 URL을 자동으로 비교하여 className/style 에 전달하는 콜백에 isActive를 넘겨줄 수있다 */}

          <NavLink
            to="/items"
            end
            className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
          >
            중고마켓
          </NavLink>
        </nav>
      </div>
      <Link to="/login" className="loginButton" id="login">
        로그인
      </Link>
    </header>
  );
}
export default Header;
