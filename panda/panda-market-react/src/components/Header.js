import React from 'react';
import '../styles/header.css';
import logoImg from '../assets/logo.svg';

function Header() {
  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="left-group">
          <a href="/" className="logo-link">
            <img src={logoImg} alt="판다마켓로고" className="logo-img" />
          </a>
          <nav className="nav-tabs">
            <a className="tab">자유게시판</a>
            <a className="tab">중고마켓</a>
          </nav>
        </div>
        <button className="login-button">로그인</button>
      </div>
    </header>
  );
}

export default Header;