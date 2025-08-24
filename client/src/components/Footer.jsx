import ic_facebook from "../assets/ic_facebook.svg";
import ic_twitter from "../assets/ic_twitter.svg";
import ic_youtube from "../assets/ic_youtube.svg";
import ic_instagram from "../assets/ic_instagram.svg";
import styles from "../styles/Footer.module.scss";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.codeit}>©codeit - 2024</div>
      <div className={styles.privacyFaq}>
        <div className={styles.privacy}>Privacy Policy</div>
        <div className={styles.faq}>FAQ</div>
      </div>
      <div className={styles.socialIC}>
        <img className={styles.facebook} src={ic_facebook} alt="ic_facebook" />
        <img className={styles.twitter} src={ic_twitter} alt="ic_twitter" />
        <img className={styles.youtube} src={ic_youtube} alt="ic_youtube" />
        <img
          className={styles.instagram}
          src={ic_instagram}
          alt="ic_instagram"
        />
      </div>
    </div>
  );
}

export default Footer;
