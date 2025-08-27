// src/components/ProductCard.jsx
export default function ProductCard({ product }) {
  return (
    <article className="card">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="price">{product.price?.toLocaleString()}원</p>
      <p className="favorite"> {product.favorite ?? 0}</p>
    </article>
  );
}
