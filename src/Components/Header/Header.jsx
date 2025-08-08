import Logo from './Logo/logo.jsx';
import Nav from './Navigator/Nav.jsx';
import './Header.module.css';

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <div>
          <Logo />
          <Nav />
        </div>
        <a href="/login" className="loginBtn">로그인</a>
      </nav>
    </header>
  );
}

export default Header;