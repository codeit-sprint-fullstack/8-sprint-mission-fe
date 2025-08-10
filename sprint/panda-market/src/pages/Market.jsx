// src/pages/Market.jsx
import { useState } from 'react';
import useProducts from '../hooks/useProducts';
import { usePageSize } from '../hooks/useBreakpointPageSize';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import Pagination from '../components/Pagination';
import SortDropdown from '../components/SortDropdown';
import SearchBar from '../components/SearchBar';

export default function Market() {
  // 검색/정렬/페이지 상태
  const [q, setQ] = useState('');
  const [sortBy, setSortBy] = useState('createdAt'); // "favorite" 선택 시 좋아요순
  const [page, setPage] = useState(1);

  // 반응형 pageSize
  const best = usePageSize('best');
  const all = usePageSize('all');

  // 베스트 상품(좋아요순 상위 일부만 보기 원하면 page=1 고정)
  const bestQuery = { page: 1, pageSize: best.pageSize, sortBy: 'favorite', order: 'desc', q: '' };
  const bestState = useProducts(bestQuery);

  // 전체 상품
  const allQuery = { page, pageSize: all.pageSize, sortBy, order: 'desc', q };
  const allState = useProducts(allQuery);

  // 반응형 변화 시 페이지 1로 리셋 (열/개수 바뀌면 UX 좋음)
  // 간단히 sort나 q가 바뀌어도 1페이지로
  function handleSortChange(next) {
    setSortBy(next);
    setPage(1);
  }
  function handleSearch(nextQ) {
    setQ(nextQ);
    setPage(1);
  }

  return (
    <>
      <Navbar />

      <main className="container" style={{ padding: '24px 0' }}>
        {/* 베스트 섹션 */}
        <section>
          <h2>베스트 상품</h2>
          {bestState.loading ? <p>로딩중...</p> :
           bestState.error ? <p>에러: {bestState.error}</p> :
           <ProductGrid items={bestState.items} columns={best.column} />}
        </section>

        {/* 도구 막대: 검색 + 정렬 */}
        <section style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 24 }}>
          <SearchBar onSearch={handleSearch} />
          <SortDropdown value={sortBy} onChange={handleSortChange} />
        </section>

        {/* 전체 상품 */}
        <section style={{ marginTop: 16 }}>
          <h2>전체 상품</h2>
          {allState.loading ? <p>로딩중...</p> :
           allState.error ? <p>에러: {allState.error}</p> :
           <>
             <ProductGrid items={allState.items} columns={all.column} />
             <Pagination
               page={page}
               total={allState.total}
               pageSize={all.pageSize}
               onChange={setPage}
             />
           </>}
        </section>
      </main>

      <Footer />
    </>
  );
}
