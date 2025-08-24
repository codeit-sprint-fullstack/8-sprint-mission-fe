import '../css/Header.css';
import panda from '../assets/panda_face.svg';
import { Link } from 'react-router-dom';

export default function Header({ showMenu = 1 }) {
  let menuElement = null;

  if (showMenu === 1) {
    const header = document.getElementsByClassName("header");

    menuElement = (
      <>
        <div>자유게시판</div>
        <Link to ="/items" >
          <div>중고마켓</div>
        </Link>
      </>
    );
  }

  return (
    <header className="header">
      
        <div className="headerContent">
        <Link to="/">
          <div className="logo">
            <img src={panda} alt="판다마켓" height="28" />
            <div className="brand">판다마켓</div>
          </div>
        </Link>
          {menuElement}
        </div>

      <div>
        <button className="loginBtn">로그인</button>
      </div>
    </header>
  );
}
