import React from 'react';
import styles from './AuthHeader.module.css';

const AuthHeader = () => {
  return (
    <div className={styles['logo']}>
      <img src="../images/logo/panda-icon-2.png" alt="판다마켓 로고" />
      <h1>판다마켓</h1>
    </div>
  );
};

export default AuthHeader;
