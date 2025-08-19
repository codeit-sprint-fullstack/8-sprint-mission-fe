import React from 'react';
import '/src/styles/Header.css';         
import '/src/styles/Global.css'; 

const Header = () => {
  return (
    <nav className="header">
      <div className="headerMenu">
        <img src="/src/assets/panda.svg" alt="pandaImage" />
        <div>자유게시판</div>
        <a href="/" className="marketLink">
          중고마켓
        </a>
      </div>
      <a href="./" className="login button user">
        로그인
      </a>
    </nav>
  );
};

export default Header;
