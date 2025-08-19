import ic_heart from "../../assets/icon/ic_heart.svg";
import './ProductsItem.css';

function ProductsItem({ item }) {
  return (
    <div className="products-item">
      <img className="products-img" src={item.images} alt={item.name} />
      <div className="products-content">
        <p className="products-name">{item.name}</p>
        <p className="products-price">{item.price}</p>
        <div className="products-favorite">
          <img className="ic-heart" src={ic_heart} alt="ic_heart" />
          <p className="products-favoriteCount">{item.favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductsItem;