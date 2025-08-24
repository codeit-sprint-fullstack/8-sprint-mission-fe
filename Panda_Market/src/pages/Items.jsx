import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MarketSection from "../components/MarketSection.jsx";
import "../styles/Items.css";

export default function Items() {
  return (
    <div>
      <header>
        <div className="frame">
          <Link className="logo" to="/">
            <img src="/images/logo_panda.png" alt="판다마켓 로고" />
          </Link>
          <nav className="nav-inline">
            <Link to="/items" className="nav-market active">자유게시판</Link>
            <Link to="/items" className="nav-market active">중고마켓</Link>
          </nav>
          <Link className="login" to="/login">
            <div className="login_button">로그인</div>
          </Link>
        </div>
      </header>

      <main className="items-page">
        <div className="items-container">
          <MarketSection
            title="판매 중인 상품"
            showToolbar={true}
            cols={{ desktop: 5, tablet: 3, mobile: 2 }}
            pageSizeMap={{ desktop: 10, tablet: 6, mobile: 4 }}
            pageWindow={5}
          />
        </div>
      </main>

      <footer>
        <div className="footer_total">
          <p className="footer_codeit">©codeit - 2024</p>
          <div className="footer_layout">
            <Link to="/privacy" className="footer_ment">Privacy Policy</Link>
            <Link to="/faq" className="footer_ment">FAQ</Link>
          </div>
          <div className="icon_layout">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <img className="icon_img" src="/images/ic_facebook.png" alt="페이스북 아이콘" />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer">
              <img className="icon_img" src="/images/ic_twitter.png" alt="트위터 아이콘" />
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <img className="icon_img" src="/images/ic_youtube.png" alt="유튜브 아이콘" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <img className="icon_img" src="/images/ic_instagram.png" alt="인스타그램 아이콘" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}