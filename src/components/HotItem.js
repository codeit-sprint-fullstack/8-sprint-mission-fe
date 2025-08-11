import React from 'react';
import styles from './HotItem.module.css';

const HotItem = () => {
  return (
    <section className={styles['hot-item']}>
      <div className={styles['hot-item-wrap']}>
        <div className={styles['hot-item__image']}>
          <img src="../images/banner/Img_home_01.png" alt="인기 상품 배너 이미지" />
        </div>
        <div className={styles['hot-item__text']}>
          <p className={styles['hot-item__label']}>Hot item</p>
          <h2 className={styles['hot-item__title']}>인기 상품을<br />확인해 보세요</h2>
          <p className={styles['hot-item__desc']}>가장 HOT한 중고거래 물품을<br />판다 마켓에서 확인해 보세요</p>
        </div>
      </div>
      <div className={styles['hot-item-wrap']}>
        <div className={`${styles['hot-item__text']} ${styles.right_text}`}>
          <p className={styles['hot-item__label']}>Search</p>
          <h2 className={styles['hot-item__title']}>구매를 원하는<br />상품을 검색하세요</h2>
          <p className={styles['hot-item__desc']}>구매하고 싶은 물품은 검색해서<br />쉽게 찾아보세요</p>
        </div>
        <div className={styles['hot-item__image']}>
          <img src="../images/banner/Img_home_02.png" alt="인기 상품 배너 이미지" />
        </div>
      </div>
      <div className={styles['hot-item-wrap']}>
        <div className={styles['hot-item__image']}>
          <img src="../images/banner/Img_home_03.png" alt="인기 상품 배너 이미지" />
        </div>
        <div className={styles['hot-item__text']}>
          <p className={styles['hot-item__label']}>register</p>
          <h2 className={styles['hot-item__title']}>판매를 원하는<br />상품을 등록하세요</h2>
          <p className={styles['hot-item__desc']}>어떤 물건이든 판매하고 싶은 상품을<br />쉽게 등록하세요</p>
        </div>
      </div>
    </section>
  );
};

export default HotItem;