import Logo from './Logo/logo.jsx';
import Nav from './Navigator/Nav.jsx';
import './Header.module.css';

function Header() {
  return (
    <header className='header'>
      <nav>
        <div>
          <Logo />
          <Nav />
        </div>
        <a href="login.html" className="login-button">로그인</a>
      </nav>
    </header>
  );
}

export default Header;