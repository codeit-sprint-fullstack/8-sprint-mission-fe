import "./footer.css";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="footer-inner">
        <div className="footer-left">© codeit-2024</div>

        <div className="footer-center">
          <a href="/privacy">Privacy Policy</a>
          <a href="/faq">FAQ</a>
        </div>

        <div className="footer-right">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <img src="/img/facebook.png" alt="페이스북" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <img src="/img/twitter.png" alt="트위터" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <img src="/img/youtube.png" alt="유튜브" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <img src="/img/instagram.png" alt="인스타그램" />
          </a>
        </div>
      </div>
    </footer>
  );
}