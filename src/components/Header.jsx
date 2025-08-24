import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="header-content">
          <div className="logo">
            <Link to="/"><img src="/assets/logo.svg" alt="판다 마켓 로고" /></Link>
          </div>
          <Link to="/login" className="login-btn">로그인</Link>
        </div>
      </div>
    </header>
  );
}

