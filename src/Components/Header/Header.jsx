import Logo from './Logo/Logo.jsx';
import Nav from './Navigator/Navigator.jsx';
import style from './Header.module.css';

function Header() {
  return (
    <header className={style.headerBox}>
      <nav className={style.navBox}>
        <div>
          <Logo />
          <Nav />
        </div>
        <a href="/login" className={style.loginBtn}>로그인</a>
      </nav>
    </header>
  );
}

export default Header;