import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_wrap}>
        <div className={styles.footer__left}>
          <p>©codeit - 2024</p>
        </div>
        <div className={styles.footer__center}>
          <a href="/privacy">Privacy Policy</a>
          <a href="/faq">FAQ</a>
        </div>
        <div className={styles.footer__right}>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img src="../images/icon/ic_facebook.png" alt="Facebook" />
          </a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
            <img src="../images/icon/ic_twitter.png" alt="Twitter" />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            <img src="../images/icon/ic_youtube.png" alt="YouTube" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src="../images/icon/ic_instagram.png" alt="Instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;