import React from 'react';
import { resolveImage } from "../services/ItemsApi.js";

const normalizeImg = (src) => {
  const s = String(src || "").trim();

  if (!s) return "/images/img_default.png";
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("/")) return s;
  if (s.toLowerCase().startsWith("images/")) return `/${s}`;
  return `/images/${s}`;
};

export default function ProductCard({ product = {} }) {
  const rawImg = product?.images?.[0] ?? product?.image ?? "";
  const img = normalizeImg(rawImg);

  const title = product?.title ?? product?.name ?? "상품";
  const price = Number(product?.price) || 0;
  const likes = product?.likes ?? product?.favorite ?? product?.favoriteCount ?? 0;

  return (
    <article className="item_box">
      <img
        className="item_img"
        src={img}
        alt={title}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/images/img_default.png";
        }}
      />
      <h3 className="item_name">{title}</h3>
      <p className="item_price">{price.toLocaleString()}원</p>
      <div className="favorite">
        <img className="item_favorite" src="/images/ic_heart.png" alt="관심" />
        <span className="favorite_count">{likes}</span>
      </div>
    </article>
  );
}