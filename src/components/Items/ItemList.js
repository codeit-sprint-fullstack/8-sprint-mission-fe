import { getProductList } from '../../api/ProductService';
import styles from './ItemList.module.css';
import ItemListSelling from './ItemListSelling';
import ProductCard from './ProductCard';
// ItemList.jsx

import React, { useEffect, useState } from 'react';
import useResponsivePageSize from '../../utils/useResponsivePageSize';

const ItemList = () => {
  const [bestItems, setBestItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = useResponsivePageSize({
    defaultSize: 10,
    breakpoints: [
      { max: 743, size: 1 },
      { max: 1199, size: 2 },
      { max: 7679, size: 4 }
    ]
  });

  useEffect(() => {
    async function fetchBest() {
      try {
        setLoading(true);
        const data = await getProductList({
          page: 1,
          pageSize,
          orderBy: 'favorite'
        });
        setBestItems(Array.isArray(data) ? data : data.list || []);
      } catch (err) {
        setError('상품을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    }
    fetchBest();
  }, [pageSize]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <section className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>베스트 상품</h2>
        <div className={styles.productList}>
          {bestItems.map(item => (
            <ProductCard
              key={item.id}
              item={item}
              styles={styles}
              cardClass={styles.productCard}
              imageWrapperClass={styles.imageWrapper}
            />
          ))}
        </div>
      </section>
      <ItemListSelling />
    </>
  );
};

export default ItemList;
