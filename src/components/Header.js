export default function Header() {
  return (
    <header className="header">
      <div className="headerLeft">
        <nav className="logo">
          <img src="/images/panda.svg" alt="판다마켓" height="28" />
          <div className="brand">판다마켓</div>
        </nav>
        <div>자유게시판</div>
        <div>중고마켓</div>
      </div>
      <div>
        <button className="loginBtn">로그인</button>
      </div>
    </header>
  );
}
