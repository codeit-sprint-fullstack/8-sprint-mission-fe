import React from 'react';

const ProductCard = ({ item, styles, cardClass, imageWrapperClass }) => (
  <div className={cardClass}>
    <div
      className={imageWrapperClass}
      style={{
        backgroundImage: `url(${Array.isArray(item.images) ? item.images[0] : item.images})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
    </div>
    <div className={styles.productInfo}>
      <div className={styles.productName}>{item.name}</div>
      <div className={styles.productPrice}>{item.price.toLocaleString()}원</div>
      <div className={styles.productFavoriteCount}>
        <img src="/images/icon/ic_heart.svg" alt="좋아요" />{item.favoriteCount}
      </div>
    </div>
  </div>
);

export default ProductCard;
