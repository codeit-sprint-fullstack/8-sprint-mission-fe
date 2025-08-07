import Logo from './Logo/logo.jsx';
import Nav from './Navigator/Nav.jsx';
import './Header.module.css';

function Header() {
  return (
    <header className={style.header}>
      <nav className={style.nav}>
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