// SellingItemList.jsx

import React, { useEffect, useState } from 'react';
import { getProductList } from '../api/ProductService';
import styles from './ItemListSelling.module.css';
import ProductCard from './ProductCard';
import useResponsivePageSize from '../utils/useResponsivePageSize';

const SellingItemList = () => {
  const [sellingItems, setSellingItems] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recent');
  const [page, setPage] = useState(1);
  const pageSize = useResponsivePageSize({
    defaultSize: 10,
    breakpoints: [
      { max: 743, size: 4 },
      { max: 1199, size: 6 },
      { max: 7679, size: 10 }
    ]
  });

  useEffect(() => {
    async function fetchSelling() {
      const selling = await getProductList({
        page,
        pageSize,
        orderBy: sort,
        keyword: search || undefined
      });
      setSellingItems(selling);
    }
    fetchSelling();
  }, [search, sort, page, pageSize]);

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>판매 중인 상품</h2>
        <div className={styles.controls}>
          <div className={styles.searchInput}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M10.8966 16.2605C12.378 16.2605 13.6424 15.7401 14.6897 14.6992C15.7369 13.6584 16.2605 12.3908 16.2605 10.8966C16.2605 9.41507 15.7369 8.1507 14.6897 7.10345C13.6424 6.05619 12.378 5.53257 10.8966 5.53257C9.4023 5.53257 8.13474 6.05619 7.09387 7.10345C6.053 8.1507 5.53257 9.41507 5.53257 10.8966C5.53257 12.3908 6.053 13.6584 7.09387 14.6992C8.13474 15.7401 9.4023 16.2605 10.8966 16.2605ZM10.8966 17.7931C9.9387 17.7931 9.04151 17.6111 8.20498 17.2471C7.36845 16.8831 6.64049 16.3914 6.02107 15.772C5.40166 15.1526 4.90996 14.4246 4.54598 13.5881C4.18199 12.7516 4 11.8544 4 10.8966C4 9.95147 4.18199 9.06066 4.54598 8.22414C4.90996 7.38761 5.40166 6.65645 6.02107 6.03065C6.64049 5.40485 7.36845 4.90996 8.20498 4.54598C9.04151 4.18199 9.9387 4 10.8966 4C11.8416 4 12.7324 4.18199 13.569 4.54598C14.4055 4.90996 15.1367 5.40485 15.7625 6.03065C16.3883 6.65645 16.8831 7.38761 17.2471 8.22414C17.6111 9.06066 17.7931 9.95147 17.7931 10.8966C17.7931 11.7139 17.659 12.4866 17.3908 13.2146C17.1226 13.9425 16.7522 14.6066 16.2797 15.2069L18.7893 17.7165C18.9425 17.8697 19.016 18.0485 19.0096 18.2529C19.0032 18.4572 18.9234 18.636 18.7701 18.7893C18.6169 18.9298 18.4381 19 18.2337 19C18.0294 19 17.8506 18.9298 17.6973 18.7893L15.1877 16.2989C14.5875 16.7714 13.9234 17.1386 13.1954 17.4004C12.4674 17.6622 11.7011 17.7931 10.8966 17.7931Z" fill="#9CA3AF" />
            </svg>
            <input
              type="text"
              placeholder={"검색할 상품을 입력해주세요"}
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <div className={styles.registerButton}>
            상품 등록하기
          </div>
          <select className={styles.sortSelect} value={sort} onChange={e => setSort(e.target.value)}>
            <option value="recent">최신순</option>
            <option value="favorite">좋아요순</option>
          </select>
        </div>
      </div>
      <div className={styles.productList}>
        {sellingItems.map(item => (
          <ProductCard
            key={item.id}
            item={item}
            styles={styles}
            cardClass={styles.sellingProductCard}
            imageWrapperClass={styles.imageWrapper}
          />
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          className={styles.pageBtn}
          onClick={() => setPage(p => p - 1)}
          disabled={page === 1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M9.5 4.66669L6 8.16669L9.5 11.6667" stroke="#4B5563" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        {(() => {
          // 5개 단위로 페이지 그룹 계산
          const startPage = Math.floor((page - 1) / 5) * 5 + 1;
          return Array.from({ length: 5 }, (_, i) => startPage + i).map(num => (
            <button
              key={num}
              className={`${styles.pageBtn} ${page === num ? styles.active : ''}`}
              onClick={() => setPage(num)}
            >
              {num}
            </button>
          ));
        })()}
        <button
          className={styles.pageBtn}
          onClick={() => setPage(p => p + 1)}
          disabled={sellingItems.length < pageSize}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4.66656L9.5 8.16656L6 11.6666" stroke="#4B5563" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default SellingItemList;
