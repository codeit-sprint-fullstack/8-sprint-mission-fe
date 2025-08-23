import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.svg';
import '../styles/header.css';

function Header() {
  const { pathname } = useLocation();
  const isItems = pathname.startsWith('/items');

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
      </div>
    </header>
  );
}

export default Header;