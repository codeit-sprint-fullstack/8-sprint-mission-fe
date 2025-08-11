import React from 'react';

export default function ProductCard({ product }) {
  const img = product?.images?.[0] ?? product?.image ?? '/images/placeholder.png';
  const title = product?.title ?? product?.name ?? '상품';
  const price = Number(product?.price) || 0;
  const likes = product?.likes ?? product?.favorite ?? product?.favoriteCount ?? 0;

  return (
    <article className="item_box">
      <img className="item_img" src={img} alt={title} />
      <h3 className="item_name">{title}</h3>
      <p className="item_price">{price.toLocaleString()}원</p>
      <div className="favorite">
        <img className="item_favorite" src="/images/ic_heart.png" alt="관심" />
        <span className="favorite_count">{likes}</span>
      </div>
    </article>
  );
}

