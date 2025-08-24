import ic_heart from "../../assets/icon/ic_heart.svg";
import style from './ProductsItem.module.css';

function ProductItem({ item }) {
  return (
    <div className={style.productItem}>
      <img className={style.productImg} src={item.images} alt={item.name} />
      <div className={style.productContent}>
        <p className={style.productName}>{item.name}</p>
        <p className={style.productPrice}>{item.price}</p>
        <div className={style.productsFavorite}>
          <img className={style.ic_heart} src={ic_heart} alt="ic_heart" />
          <p className={style.productFavoriteCount}>{item.favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;