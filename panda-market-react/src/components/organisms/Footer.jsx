export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="copyright">©codeit - 2025</p>
        <nav className="footer-nav">
          <a href="/privacy">Privacy Policy</a>
          <a href="/faq">FAQ</a>
        </nav>
        <div className="social-links">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="페이스북으로 이동"
          >
            <img src="/footer/footer-icon-01.svg" alt="페이스북 아이콘" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="트위터로 이동"
          >
            <img src="/footer/footer-icon-02.svg" alt="트위터 아이콘" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="유튜브로 이동"
          >
            <img src="/footer/footer-icon-03.svg" alt="유튜브 아이콘" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="인스타그램으로 이동"
          >
            <img src="/footer/footer-icon-04.svg" alt="인스타그램 아이콘" />
          </a>
        </div>
      </div>
    </footer>
  );
}
