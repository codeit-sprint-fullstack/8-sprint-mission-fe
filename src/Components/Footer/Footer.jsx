import facebook from './images/ic_facebook.svg';
import twitter from './images/ic_twitter.svg';
import youtube from './images/ic_youtube.svg';
import instagram from './images/ic_instagram.svg';
import style from './Footer.module.css';

function Footer() {
  return (
  <footer className={style.Footer}>
    <div className={style.container}>
      <p>@codeit - 2024</p>

      <div className={style.FooterLinks}>
        <a href="/privacy">Privacy Policy</a>
        <a href="/faq">FAQ</a>
      </div>

      <div className={style.SocialLinks}>
        <a href="https://www.facebook.com/" target="_blank">
          <img src={facebook} alt="Facebook" />
        </a>
        <a href="https://x.com/" target="_blank">
          <img src={twitter} alt="Twitter" />
        </a>
        <a href="https://www.youtube.com/" target="_blank">
          <img src={youtube} alt="YouTube" />
        </a>
        <a href="https://www.instagram.com/" target="_blank">
          <img src={instagram} alt="Instagram" />
        </a>
      </div>
    </div>
  </footer>
  );
}

export default Footer;