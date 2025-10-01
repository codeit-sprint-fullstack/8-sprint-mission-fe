import React from 'react';
import styles from './Footer.module.css';
import SnsLinks from './molecules/SnsLinks';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <p className={styles.footerCopyright}>©codeit - 2024</p>
        <div className={styles.footerPrivacy}>
          <Link href="/privacy" className={styles.linkPrivacy}>
            Privacy Policy
          </Link>
          <Link href="/faq" className={styles.linkFaq}>
            FAQ
          </Link>
        </div>
        <div className={styles.footerSocial}>
          <SnsLinks />
        </div>
      </div>
    </div>
  );
};

export default Footer;
