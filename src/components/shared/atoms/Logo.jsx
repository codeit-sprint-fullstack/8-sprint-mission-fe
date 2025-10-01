import React from 'react';
import styles from './Logo.module.css';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className={styles.logoWrapper}>
      <img src="/logos/PandaLogo.svg" alt="로고" className={styles.logoIcon} />
      <span className={styles.logoText}>판다마켓</span>
    </Link>
  );
};

export default Logo;
