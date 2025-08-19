export default function Header() {
  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="header-content">
          <div className="logo">
            <a href="/"><img src="/assets/images/logo.svg" alt="판다 마켓 로고" /></a>
          </div>
          <a href="/login.html" className="login-btn">로그인</a>
        </div>
      </div>
    </header>
  );
}
