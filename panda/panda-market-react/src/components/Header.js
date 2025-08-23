import React from 'react';

import { Link, NavLink, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.svg';
import '../styles/header.css';

function Header() {
  const { pathname } = useLocation();
  const isItems = pathname.startsWith('/items');


import '../styles/header.css';
import logoImg from '../assets/logo.svg';

function Header() {

  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="left-group">

          <Link to="/" className="logo-link">
            <img src={logoImg} alt="판다마켓로고" className="logo-img" />
          </Link>

          <nav className="nav-tabs">
            <NavLink to="/freeboard" className="tab">
              자유게시판
            </NavLink>

            <NavLink
              to="/items"
              className={`tab ${isItems ? 'active' : ''}`}
            >
              중고마켓
            </NavLink>
          </nav>
        </div>

        <Link to="/login" className="login-button">
          로그인
        </Link>

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