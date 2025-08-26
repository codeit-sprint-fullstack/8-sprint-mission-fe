import ic_facebook from "../../assets/icon/ic_facebook.svg";
import ic_twitter from "../../assets/icon/ic_twitter.svg";
import ic_youtube from "../../assets/icon/ic_youtube.svg";
import ic_instagram from "../../assets/icon/ic_instagram.svg";
import style from "./Footer.module.css";

function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footerWrap}>
        <span className={style.codeit}>©codeit - 2024</span>
        <div className={style.center}>
          <a href="./privacy" className={style.privacy}>
            Privacy policy
          </a>
          <a href="./faq" className={style.faq}>
            FAQ
          </a>
        </div>
        <div className={style.boxSNS}>
          <a
            href="https://www.facebook.com/"
            className={`${style.facebook} ${style.sns}`}
            target="_blank"
          >
            <img src={ic_facebook} alt="ic_facebook" />
          </a>
          <a href="https://x.com/" className={`${style.twitter} ${style.sns}`} target="_blank">
            <img src={ic_twitter} alt="ic_twitter" />
          </a>
          <a
            href="https://www.youtube.com/"
            className={`${style.youtube} ${style.sns}`}
            target="_blank"
          >
            <img src={ic_youtube} alt="ic_youtube" />
          </a>
          <a
            href="https://www.instagram.com/"
            className={`${style.instagram} ${style.sns}`}
            target="_blank"
          >
            <img src={ic_instagram} alt="ic_instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
