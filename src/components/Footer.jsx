export default function Footer() {
  return (
    <footer>
      <div className="footer-wrapper">
        <div className="footer-content">
          <p className="footer-copy">©codeit - 2024</p>
          <div className="footer-links">
            <a href="/privacy" className="footer-link-privacy">Privacy Policy</a>
            <a href="/faq" className="footer-link-terms">FAQ</a>
          </div>
          <div className="footer-sns-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/public/assets/facebook.svg" alt="페이스북" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="/public/assets/twitter.svg" alt="트위터" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <img src="/public/assets/youtube.svg" alt="유튜브" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="/public/assets/instagram.svg" alt="인스타그램" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
