import React from 'react';
import styles from './SnsLinks.module.css';

const SnsLinks = () => {
  return (
    <div className={styles.SnsContainer}>
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <img src="/icons/facebook.svg" alt="Facebook" className={styles.SnsFacebook} />
      </a>
      <a href="https://x.com" target="_blank" rel="noopener noreferrer">
        <img src="/icons/x.svg" alt="X" className={styles.SnsX} />
      </a>
      <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
        <img src="/icons/youtube.svg" alt="YouTube" className={styles.SnsYoutube} />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <img src="/icons/instagram.svg" alt="Instagram" className={styles.SnsInsta} />
      </a>
    </div>
  );
};

export default SnsLinks;
