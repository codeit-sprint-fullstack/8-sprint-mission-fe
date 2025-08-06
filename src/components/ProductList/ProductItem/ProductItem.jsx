import ic_heart from '@images/ic_heart.svg';
import styles from './ProductItem.module.scss';

function ProductItem({ images = [], name = '', price = 0, favoriteCount = 0 }) {
    return (
        <li className={styles.container}>
            <div className={styles.imgWrapper}>
                <img src={images[0]} alt={`${name}상품 이미지`} />
            </div>
            <h2>{name}</h2>
            <p>{price.toLocaleString()}원</p>
            <div className={styles.favorite}>
                <img src={ic_heart} alt='찜 수 표시용 아이콘' />
                <p>{favoriteCount}</p>
            </div>
        </li>
    );
}

export default ProductItem;