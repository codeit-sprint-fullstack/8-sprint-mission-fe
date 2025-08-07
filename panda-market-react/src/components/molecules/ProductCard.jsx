import { LikeButton } from '../atoms/LikeButton';
import styles from '../../styles/components/molecules/ProductCard.module.css';
import { Link } from 'react-router-dom';

export function ProductCard({
  id,
  name,
  price,
  image = '/product-list/prod-test.png',
  favoriteCount,
}) {
  return (
    <div className={styles.productCard}>
      <Link to={`/products/${id}`}>
        <img src={image} alt={name} />
        <div className={styles.productCardContent}>
          <h2>{name}</h2>
          <p>{price.toLocaleString()}원</p>
        </div>
      </Link>
      <LikeButton favoriteCount={favoriteCount} />
    </div>
  );
}
