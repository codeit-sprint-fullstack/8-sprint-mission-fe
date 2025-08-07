import React from 'react';
import '../styles/ProductCard.css';

function ProductCard({ product, className = '' }) {
  const hasValidImage =
    Array.isArray(product.images) &&
    product.images.length > 0 &&
    product.images[0].trim() !== '';

  const imageUrl = hasValidImage ? product.images[0] : '/no-image.jpg';

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/no-image.jpg';
  };

  return (
    <div className={`product-card ${className}`}>
      <img
        src={imageUrl}
        alt={product.name}
        className="product-image"
        onError={handleImageError}
      />
      <div className="product-info">
        <p className="product-name">{product.name}</p>
        <p className="product-price">{product.price.toLocaleString()}원</p>
        <p className="product-likes">♡ 240{product.likes}</p>
      </div>
    </div>
  );
}

export default ProductCard;
