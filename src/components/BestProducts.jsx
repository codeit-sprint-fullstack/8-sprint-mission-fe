import React, { useEffect, useState } from 'react';
import { getProducts } from '/src/api/api.js';
import BestProductList from '/src/components/BestProductList';
import styles from '/src/styles/Common.module.css';

export default function BestProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await getProducts({ page: 1, pageSize: 10, orderBy: 'favorite' });
        console.log('API 응답:', response);

        const products = response.list || [];
        setItems(products.slice(0, 4));
      } catch (error) {
        console.error('상품 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) return <p>상품을 불러오는 중입니다...</p>;
  if (!items.length) return <p>상품이 없습니다.</p>;

  return (
    <div className={styles.wrapper}>
      <h1>베스트 상품</h1>
      <div className={styles.bestProductList}>
        {items.map(item => (
          <BestProductList key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}