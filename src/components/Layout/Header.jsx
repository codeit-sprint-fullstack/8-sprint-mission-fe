import React from "react";
import { Link } from "react-router-dom"; 
import "/src/assets/css/Header.css";

const Header = () => {
  return (
    <nav className="header">
      <div className="headerMenu">
        <Link to="/">
          <img src="/assets/logo.svg" alt="pandaImage" />
        </Link>
        <div>자유게시판</div>
        <Link to="/market" className="marketLink">
          중고마켓
        </Link>
      </div>
      <Link to="/login" className="login button user">
        로그인
      </Link>
    </nav>
  );
};

export default Header;
