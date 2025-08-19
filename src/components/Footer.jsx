import React from 'react';
import '/src/styles/Footer.css';         
import '/src/styles/Global.css'; 

const Footer = () => {
  return (
    <footer className="footerWrapper">
      <div className="footerContent">
        <p className="footerCopy">©codeit - 2024</p>
        <div className="footerLinks">
          <a href="/privacy" className="footerLinkPrivacy">Privacy Policy</a>
          <a href="/faq" className="footerLinkTerms">FAQ</a>
        </div>
        <div className="footerSnsIcons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/src/assets/facebook.svg" alt="페이스북" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="/src/assets/twitter.svg" alt="트위터" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <img src="/src/assets/youtube.svg" alt="유튜브" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/src/assets/instagram.svg" alt="인스타그램" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
