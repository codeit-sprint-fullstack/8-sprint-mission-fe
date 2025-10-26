import Link from 'next/link';
import styles from './ProductList.module.css';
import url from '@/api/backendUrl.js';

//pubic 폴더는 루트로 어디서는 정의 가능.
const heartIcon = '/images/items/ic_heart.svg';
const productDefault = '/images/items/product_default.png';
//png는 backgroundImage에 표시되고, svg는 표시되지 않는 문제 발생.

function Product({ item }) {
  const productImageURL =
    item.images?.length > 0 ? `${url}/uploads/${item.images[0]}` : productDefault;
  const style = {
    backgroundImage: `url(${productImageURL})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    borderRadius: '10px',
    backgroundPosition: 'center',
  };

  return (
    <div className={styles.product}>
      {/* 리스폰스 이미지가 없는 url이어서 임의로 랜덤 이미지를 넣었습니다.*/}
      <div className={styles.imageBox} style={style}>
        <img src={productImageURL || productDefault} className="w-[100%] h-[100%] object-cover" />
      </div>
      <div className={styles.description}>
        <p className={styles.name}>{item.name}</p>
        <p className={styles.price}>{item.price.toLocaleString() + '원'}</p>
        <div className={styles.favorite}>
          <button>
            <img src={heartIcon} />
          </button>
          <p>{item.favoriteCount}</p>
        </div>
      </div>
    </div>
  );
}

function ProductList({ items, isCommon }) {
  return (
    <ul className={`${styles.listGrid} ${isCommon ? styles.common : styles.best}`}>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <Link href={`/items/${item.id}`} className={styles.link}>
              <Product item={item} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default ProductList;
