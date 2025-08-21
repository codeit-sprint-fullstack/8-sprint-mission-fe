import React from 'react';
import styles from './Banner.module.css';

const Banner = () => {
  return (
    <section className={styles['banner-section']}>
      <div className={styles['banner-wrap']}>
        <div className={styles['banner-text']}>
          <h1>일상의 모든 물건을 거래해 보세요</h1>
          <a href="/items" className={styles['banner-button']}>구경하러 가기</a>
        </div>
        <div className={styles['banner-image']}>
          <img src="../images/banner/Img_home_top.png" alt="판다 캐릭터 배너" />
        </div>
      </div>
    </section>
  );
};

export default Banner;