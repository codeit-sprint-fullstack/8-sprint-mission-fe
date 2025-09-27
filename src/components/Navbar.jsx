import { Link, useLocation } from 'react-router-dom'
import './navbar.css'

export default function Navbar() {
  const { pathname } = useLocation()
  const isItems = pathname.startsWith('/items')

  return (
    <header className="nav">
      <div className="nav-inner">
        {/* 왼쪽: 로고 + 메뉴 */}
        <div className="left">
          <Link to="/" className="brand" aria-label="판다마켓 홈">
            <span className="badge">
              <img src="/img/logo-panda.png" alt="판다마켓 로고" />
            </span>
            <span className="brand-name">판다마켓</span>
          </Link>

          <nav className="menu" aria-label="주 메뉴">
            <Link to="/boards">자유게시판</Link>
            <Link to="/items" className={isItems ? 'active' : ''}>중고마켓</Link>
          </nav>
        </div>

        {/* 오른쪽: 로그인 */}
        <Link to="/login" className="login-btn">로그인</Link>
      </div>
    </header>
  )
}
