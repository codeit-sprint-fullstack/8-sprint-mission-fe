import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles['header-wrap']}>
        <Link className={styles.logo} to="/">
          <img src="../images/logo/panda-icon.png" alt="판다마켓 로고" />
          <span className={styles['logo-text']}>판다마켓</span>
        </Link>
        <Link className={styles['login-btn']} to="/login">로그인</Link>
      </div>
    </header>
  );
};

export default Header;