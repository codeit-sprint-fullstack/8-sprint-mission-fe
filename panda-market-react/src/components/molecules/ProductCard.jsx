import { LikeButton } from '../atoms/LikeButton';
import styles from '../../styles/components/molecules/ProductCard.module.css';
import { Link } from 'react-router-dom';

const imgReplaceUrl = '/product-list/prod-test.png';

export function ProductCard({ id, name, price, image = imgReplaceUrl, favoriteCount }) {
  function handleImageError(e) {
    e.currentTarget.src = imgReplaceUrl;
  }

  return (
    <div className={styles.productCard}>
      <Link to={`/items/${id}`}>
        <img src={image} alt={name} onError={handleImageError} />
        <div className={styles.productCardContent}>
          <h2>{name}</h2>
          <p>{price.toLocaleString()}원</p>
        </div>
      </Link>
      <LikeButton favoriteCount={favoriteCount} />
    </div>
  );
}
