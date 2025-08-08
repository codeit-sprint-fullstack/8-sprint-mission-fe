import youtube from "../assets/footer_youtube.png";
import facebook from "../assets/footer_facebook.png";
import twitter from "../assets/footer_twitter.png";
import instagram from "../assets/footer_instagram.png";
import "../css/footer.css";
function Footer() {
  return (
    <footer>
      <div className="copyright">@codeit - 2024</div>

      <div className="footer_menu">
        <a href="privacy.html">Privacy Policy</a>
        <a href="faq.html">FAQ</a>
      </div>

      <div className="footer_sns">
        <a href="https://www.facebook.com/" target="_blank">
          <img src={facebook} alt="페이스북" width="20" />
        </a>
        <a href="https://twitter.com/" target="_blank">
          <img src={twitter} alt="트위터" width="20" />
        </a>
        <a href="https://www.youtube.com/" target="_blank">
          <img src={youtube} alt="유튜브" width="20" />
        </a>
        <a href="https://www.instagram.com/" target="_blank">
          <img src={instagram} alt="인스타그램" width="20" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
