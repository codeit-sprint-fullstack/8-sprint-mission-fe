import "../../../styles/global/global.css";
import "./Footer.css";

function Footer() {
  return (
<footer>
      <div className="footerLinks">
        <div className="footerLinksContainer">
          <div className="footerLinksRight">
            <p className="footerCopyright">©codeit - 2024</p>
          </div>
          <div className="footerLinksCenter">
            <a href="/privacy.html">Privacy Policy</a>
            <a href="/faq.html">FAQ</a>
          </div>
          <div className="footerLinksLeft" target="_blank">
            <a href="https://facebook.com" target="_blank">
              <img src="/images/facebook-icon.svg" alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank">
              <img src="/images/twitter-icon.svg" alt="Twitter" />
            </a>
            <a href="https://www.youtube.com/" target="_blank">
              <img src="/images/youtube-icon.svg" alt="YouTube" />
            </a>
            <a href="https://instagram.com" target="_blank">
              <img src="/images/insta-icon.svg" alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
