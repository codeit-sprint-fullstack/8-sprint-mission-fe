import React from 'react';
import styles from './SocialLogin.module.css';

const SocialLogin = () => {
  return (
    <div className={styles['social-login']}>
      <span>간편 로그인하기</span>
      <div className={styles['social-icons']}>
        <a href="https://www.google.com/">
          <img src="/images/icon/ic_google.png" alt="구글 로그인" />
        </a>
        <a href="https://www.kakaocorp.com/page/">
          <img src="/images/icon/ic_kakao.png" alt="카카오 로그인" />
        </a>
      </div>
    </div>
  );
};

export default SocialLogin;