import style from './Footer.css';


function Footer() {
  return (
  <footer className={style.footerBg}>
    <div className={style.footer}>
      <p>@codeit - 2024</p>

      <div className={style.footerLinks}>
        <a href="privacy.html">Privacy Policy</a>
        <a href="faq.html">FAQ</a>
      </div>

      <div className={style.socialLinks}>
        <a href="https://www.facebook.com/" target="_blank">
          <img src="img/ic_facebook.svg" alt="Facebook" />
        </a>
        <a href="https://x.com/" target="_blank">
          <img src="img/ic_twitter.svg" alt="Twitter" />
        </a>
        <a href="https://www.youtube.com/" target="_blank">
          <img src="img/ic_YouTube.svg" alt="YouTube" />
        </a>
        <a href="https://www.instagram.com/" target="_blank">
          <img src="img/ic_instargram.svg" alt="Instagram" />
        </a>
      </div>
    </div>
  </footer>
  );
}
