import facebook from "@/assets/icons/facebook.svg";
import twitter from "@/assets/icons/twitter.svg";
import youtube from "@/assets/icons/youtube.svg";
import instagram from "@/assets/icons/instagram.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <div className="inner-container">
        <div className="copyright">©codeit-2024</div>
        <div className="info">
          <Link to="/privacy">Privacy Policy</Link> | <Link to="/faq">FAQ</Link>
        </div>
        <div className="sns">
          <Link to="https://www.instagram.com">
            <img src={facebook} alt="facebook page" />
          </Link>
          <Link to="https://www.twitter.com">
            <img src={twitter} alt="twitter page" />
          </Link>
          <Link to="https://www.youtube.com">
            <img src={youtube} alt="youtube page" />
          </Link>
          <Link to="https://www.instagram.com">
            <img src={instagram} alt="instagram page" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
