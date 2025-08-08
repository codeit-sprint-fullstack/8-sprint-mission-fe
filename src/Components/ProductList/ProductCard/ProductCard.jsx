import heart from './ic_heart.svg';
import './ProductCard.module.css';

function ProductCard({ images= [], name= '', price= 0, favoriteCount= 0 }) {
  return (
    <li className={container}>
      <div className={ProductImg}>
        <img src={images[0]} alt={`${name}상품 이미지`} />
      </div>

      <div className={ProductInfo}>
        <h2>{name}</h2>

        <p>{price.toLocaleString()}원</p>

        <div className={favorite}>
          <a><img src={heart} alt="찜하기 아이콘" /></a>
          <p>{favoriteCount}</p>
        </div>
      </div>
    </li>
  );
}

export default ProductCard;