import React from 'react';
import styles from '/src/styles/Common.module.css';

export default function BestProductList({ item }) {
  return (
    <div className={styles.productCard}>
      <img
        src={item.images?.[0] || ''} 
        alt={item.name}
        className={styles.productImage}
        onError={e => (e.target.style.display = 'none')}
      />
      <h3>{item.name || '상품명 없음'}</h3>
      <p>{item.price ? item.price.toLocaleString() + '원' : '가격 정보 없음'}</p>
      <div className={styles.favoriteCount}>
        <img
          src="/src/assets/heart.svg"
          alt="좋아요"
          className={styles.heartIcon}
          width={16}
          height={16}
          loading="lazy"
        />
        <span>{item.favoriteCount || 0}</span>
      </div>
    </div>
  );
}