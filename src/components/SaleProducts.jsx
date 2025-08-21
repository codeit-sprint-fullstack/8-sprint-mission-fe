import React, { useEffect, useState } from 'react';
import { getProducts } from '/src/api/api.js';
import styles from '/src/styles/Common.module.css';

export default function SaleProducts() {
  const PAGE_SIZE = 10;
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState('recent');
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const pageIcons = [
    { num: 1, active: '/src/assets/page1Active.svg', inactive: '/src/assets/page1.svg' },
    { num: 2, active: '/src/assets/page2Active.svg', inactive: '/src/assets/page2.svg' },
    { num: 3, active: '/src/assets/page3Active.svg', inactive: '/src/assets/page3.svg' },
    { num: 4, active: '/src/assets/page4Active.svg', inactive: '/src/assets/page4.svg' },
    { num: 5, active: '/src/assets/page5Active.svg', inactive: '/src/assets/page5.svg' },
  ];

  // API 요청 함수
  const fetchProducts = async (pageNum, order = orderBy, search = keyword) => {
    setLoading(true);
    try {
      const data = await getProducts({
        page: pageNum,
        pageSize: PAGE_SIZE,
        orderBy: order,
        keyword: search,
      });
      setProducts(data.list);
      setPage(pageNum);
    } catch (error) {
      console.error('상품 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 초기 렌더링 및 orderBy, keyword 변경 시 1페이지 불러오기
  useEffect(() => {
    fetchProducts(1, orderBy, keyword);
  }, [orderBy, keyword]);

  return (
    <div className={styles.wrapper}>
      {/* 상단 영역 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}
      >
        <h1 style={{ margin: 0 }}>판매 중인 상품</h1>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {/* 검색창 + 아이콘 */}
          <div className={styles.searchWrapper}>
            <img
              src="/src/assets/search.svg"
              alt="검색 아이콘"
              className={styles.searchIcon}
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="검색할 상품을 입력하세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className={styles.searchInput}
              aria-label="상품 검색"
            />
          </div>

          {/* 상품 등록하기 버튼 */}
          <button className={styles.addProductButton}>상품 등록하기</button>

          {/* 정렬 드롭다운 */}
          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
            aria-label="정렬 방식 선택"
            className={styles.selectOrderBy}
          >
            <option value="recent">최신순</option>
            <option value="favorite">좋아요순</option>
          </select>
        </div>
      </div>

      {/* 상품 리스트 */}
      <div className={styles.saleProductList}>
        {loading && <p>상품을 불러오는 중입니다...</p>}
        {!loading && products.length === 0 && <p>상품이 없습니다.</p>}
        {products.map((item) => (
          <div key={item.id} className={styles.productCard}>
            <img
              src={item.images?.[0] || '/src/assets/youtube.svg'}
              alt={item.name || '샘플 이미지'}
              className={styles.productImage}
              onError={(e) => (e.target.src = '/src/assets/sample.svg')}
            />
            <h3>{item.name || '상품명 없음'}</h3>
            <p>{item.price ? item.price.toLocaleString() + '원' : '가격 정보 없음'}</p>
            <div className={styles.favoriteCount}>
              <img
                src="/src/assets/heart.svg"
                alt="좋아요"
                className={styles.heartIcon}
                width={16}
                height={16}
                loading="lazy"
              />
              <span>{item.favoriteCount || 0}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className={styles.pagination}>
        <button onClick={() => page > 1 && fetchProducts(page - 1)} disabled={page === 1}>
          <img src="/src/assets/arrowLeft.svg" alt="이전" />
        </button>

        {pageIcons.map((p) => (
          <button key={p.num} onClick={() => fetchProducts(p.num)}>
            <img src={page === p.num ? p.active : p.inactive} alt={`${p.num}페이지`} />
          </button>
        ))}

        <button onClick={() => page < 5 && fetchProducts(page + 1)} disabled={page === 5}>
          <img src="/src/assets/arrowRight.svg" alt="다음" />
        </button>
      </div>
    </div>
  );
}
