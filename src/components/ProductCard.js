export default function ProductCard({ item }) {
  const { title, price, imgUrl, favoriteCount } = item;
  return (
    <div className="productCard">
      <div className="thumb">
        <img src={imgUrl} alt={title} />
      </div>
      <div className="meta">
        <div className="title">{title}</div>
        <div className="price">{Number(price).toLocaleString()}원</div>
        <div className="likes">♡ {favoriteCount ?? 0}</div>
      </div>
    </div>
  );
}
