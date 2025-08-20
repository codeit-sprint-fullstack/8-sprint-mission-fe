import "../styles/Footer.css";
import ic_facebook from "../assets/ic_facebook.svg";
import ic_twitter from "../assets/ic_twitter.svg";
import ic_youtube from "../assets/ic_youtube.svg";
import ic_instagram from "../assets/ic_instagram.svg";

function Footer() {
  return (
    <div className="footer">
      <div className="codeit">©codeit - 2024</div>
      <div className="privacy-faq">
        <div className="privacy">Privacy Policy</div>
        <div className="faq">FAQ</div>
      </div>
      <div className="socialIC">
        <img className="facebook" src={ic_facebook} alt="ic_facebook" />
        <img className="twitter" src={ic_twitter} alt="ic_twitter" />
        <img className="youtube" src={ic_youtube} alt="ic_youtube" />
        <img className="instagram" src={ic_instagram} alt="ic_instagram" />
      </div>
    </div>
  );
}

export default Footer;
