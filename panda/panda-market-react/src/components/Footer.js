import React from 'react';
import '../styles/footer.css';
import facebookIcon from '../assets/facebook.svg';
import twitterIcon from '../assets/twitter.svg';
import youtubeIcon from '../assets/youtube.svg';
import instagramIcon from '../assets/instagram.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="footer-left">© codeit - 2024</div>

        <div className="footer-center">
          <a href="/privacy">Privacy Policy</a>
          <a href="/faq">FAQ</a>
        </div>

        <div className="footer-right">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={facebookIcon} alt="Facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={twitterIcon} alt="Twitter" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <img src={youtubeIcon} alt="Youtube" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;