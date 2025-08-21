import React from 'react';
import styles from './Banner.module.css';

const Banner = () => {
  return (
    <section className={`${styles['banner-section']} ${styles['banner-bottom']}`}>
      <div className={styles['banner-wrap']}>
        <div className={styles['banner-text']}>
          <h1>믿을 수 있는<br />판다마켓 중고 거래</h1>
        </div>
        <div className={styles['banner-image']}>
          <img src="../images/banner/Img_home_bottom.png" alt="판다 캐릭터 배너" />
        </div>
      </div>
    </section>
  );
};

export default Banner;