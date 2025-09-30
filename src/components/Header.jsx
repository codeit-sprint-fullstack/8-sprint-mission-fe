import { Link, useLocation } from 'react-router-dom'
import './header.css'


export default function Header(){
  const { pathname } = useLocation()
  const isItems = pathname.startsWith('/items')

  return (
    <header className="nav landing-header">
      <div className="nav-inner">
        <Link to="/" className="logo">
          <img src="/img/logo-panda.png" alt="판다마켓 로고" width="40" height="40" />
          <span style={{color:'#3692FF', fontWeight:800}}>판다마켓</span>
        </Link>


        <Link to="/login" className="login-btn">로그인</Link>
      </div>
    </header>
  )
}