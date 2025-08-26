import { Link, NavLink, useLocation } from 'react-router-dom';

export function Header() {
  const { pathname } = useLocation();
  const isMainPage = pathname === '/';

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-left">
          <Link to="/" className="logo" aria-label="판다마켓 홈으로 이동">
            <picture>
              <source srcSet="/header/logo-sm.svg" media="(max-width: 744px)" />
              <img src="/header/logo.svg" alt="판다마켓 로고" />
            </picture>
          </Link>
          {!isMainPage && (
            <ul>
              <li>
                <NavLink to="/free-board">자유게시판</NavLink>
              </li>
              <li>
                <NavLink to="/items">중고마켓</NavLink>
              </li>
            </ul>
          )}
        </div>

        <Link to="/login" className="btn-small-40">
          로그인
        </Link>
      </nav>
    </header>
  );
}
