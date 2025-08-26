import SmallButton from "@/components/Button/SmallButton";
import smLogo from "../assets/logos/smLogo.svg";
import "./Layout.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header-container">
      <div className="inner-container inner-header">
        <Link to="/">
          <img src={smLogo} alt="small logo" width={153} />
        </Link>
        <Link to="/login">
          <SmallButton>로그인</SmallButton>
        </Link>
      </div>
    </div>
  );
}

export default Header;
