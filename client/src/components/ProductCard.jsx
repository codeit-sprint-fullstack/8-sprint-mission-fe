import icHeart from "../assets/ic_heart.svg";
import sampleImg from "../assets/sampleImg.svg";
import styles from "../styles/ProductCard.module.scss";

function ProductCard({ product, type }) {
  const { id, name, price } = product;
  const priceNum = Number(price);

  return (
    <div className={`${styles.productCard} ${styles.type}`}>
      <img src={sampleImg} alt={id} />
      <div className={styles.detail}>
        <div className={styles.name}>{name}</div>
        <div className={styles.price}>{priceNum.toLocaleString("ko-KR")}</div>
        <div className={styles.favoriteCount}>
          <img className={styles.img} src={icHeart} alt="icHeart" />
          <div className={styles.num}>1</div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
