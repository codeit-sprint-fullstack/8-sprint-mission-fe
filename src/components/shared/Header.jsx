'use client';
import React from 'react';
import Link from 'next/link';
import Logo from './atoms/Logo';
import Button from './atoms/Button';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <nav className={styles.navLeft}>
          <div className={styles.logoWrapper}>
            <Logo />
          </div>
          <Link href="/discussion" className={styles.navlink}>
            자유게시판
          </Link>
          <Link href="/products" className={styles.navlink}>
            중고마켓
          </Link>
        </nav>

        <div className={styles.navRight}>
          <Button variant="primary" size="small" href="/login">
            로그인
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
