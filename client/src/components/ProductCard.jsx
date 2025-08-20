import "../styles/ProductCard.css";
import icHeart from "../assets/ic_heart.svg";
import sampleImg from "../assets/sampleImg.svg";

function ProductCard({ product, type }) {
  const { id, name, price } = product;
  const priceNum = Number(price);

  return (
    <div className={`productCard ${type}`}>
      <img src={sampleImg} alt={id} />
      <div className="detail">
        <div className="name">{name}</div>
        <div className="price">{priceNum.toLocaleString("ko-KR")}</div>
        <div className="favoriteCount">
          <img className="img" src={icHeart} alt="icHeart" />
          <div className="num">1</div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
