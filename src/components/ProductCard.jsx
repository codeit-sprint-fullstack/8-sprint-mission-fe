export default function ProductCard({
  id,
  name,
  price,
  imageSrc,
  likeCount = 240,
}) {
  return (
    <div className="productCard" data-id={id}>
      <img
        className="card-thumb"
        src={imageSrc || "/fallback-product.png"}
        alt={name}
        onError={(e) => (e.currentTarget.src = "/fallback-product.png")}
      />
      <div className="card-title">{name}</div>
      <div className="card-price">{Number(price || 0).toLocaleString()}원</div>
      <div className="card-meta">
        <span>♡</span>
        <span>{likeCount}</span>
      </div>
    </div>
  );
}
