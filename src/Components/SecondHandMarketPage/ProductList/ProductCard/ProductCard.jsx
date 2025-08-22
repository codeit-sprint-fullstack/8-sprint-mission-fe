import ic_heart from '../../../../images/ic_heart.svg';
import defaultImg from '../../../../images/img_default.svg';
import style from './ProductCard.module.css';

function ProductCard({ name= '', price= 0, favoriteCount= 0 }) {
  return (
    <li className={style.container}>
      <div className={style.ProductImg}>
        <img src={defaultImg} alt={`상품 기본 이미지`} />
      </div>

      <div className={style.ProductInfo}>
        <h2>{name}</h2>

        <p>{price.toLocaleString()}원</p>

        <div className={style.favorite}>
          <button><img src={ic_heart} alt="찜하기 아이콘" /></button>
          <p>{favoriteCount}</p>
        </div>
      </div>
    </li>
  );
}

export default ProductCard;