import ic_facebook from '../assets/icon/ic_facebook.svg';
import ic_twitter from '../assets/icon/ic_twitter.svg';
import ic_youtube from '../assets/icon/ic_youtube.svg';
import ic_instagram from '../assets/icon/ic_instagram.svg';
import './css/Footer.css';

function Footer() {
  return(
  <footer class="main-footer">
    <div class="footer-wrap">
      <span class="codeit">©codeit - 2024</span>
      <div class="center">
        <a href="./privacy" class="privacy">Privacy policy</a>
        <a href="./faq" class="faq">FAQ</a>
      </div>
      <div class="sns-box">
        <a href="https://www.facebook.com/" class="facebook sns" target="_blank">
          <img src={ic_facebook} alt="ic_facebook" />
        </a>
        <a href="https://x.com/" class="twitter sns" target="_blank">
          <img src={ic_twitter} alt="ic_twitter" />
        </a>
        <a href="https://www.youtube.com/" class="youtube sns" target="_blank">
          <img src={ic_youtube} alt="ic_youtube" />
        </a>
        <a href="https://www.instagram.com/" class="instagram sns" target="_blank">
          <img src={ic_instagram} alt="ic_instagram" />
        </a>
      </div>
    </div>
  </footer>
  );
}

export default Footer;