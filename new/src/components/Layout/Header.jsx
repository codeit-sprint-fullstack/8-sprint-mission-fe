import React from "react";
import Logo from "../../assets/images/logo/logo.svg";
import "./Header.css";

function Header() {
  return (
    <header className="globalHeader">
      <div className="headerLeft">
        <img
          src={Logo}
          alt="판다마켓 로고"
          width="153"
          className="headerLogo"
        />

        <nav>
          <ul>
            <li>자유게시판</li>
            <li>중고마켓</li>
          </ul>
        </nav>
      </div>
      <button type="click" className="loginLink button">
        로그인
      </button>
    </header>
  );
}

export default Header;
