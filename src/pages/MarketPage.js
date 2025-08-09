import { useEffect, useMemo, useState } from 'react';
import useProducts from '../hooks/useProducts';
import Pagination from '../components/Pagination';
import ProductGrid from '../components/ProductGrid';
import BestProducts from '../components/BestProducts';
import SortDropdown from '../components/SortDropdown';
import SearchBar from '../components/SearchBar';

const getViewportWidth = () =>
  document?.documentElement?.clientWidth || window.innerWidth || 1200;

function getColumns(width, type) {
  if (type === 'best') {
    if (width >= 1024) return 4;
    if (width >= 768) return 2;
    return 1;
  }
  if (width >= 1024) return 5;
  if (width >= 768) return 3;
  return 2;
}

export default function MarketPage() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('createdAt');
  const [search, setSearch] = useState('');
  const [width, setWidth] = useState(getViewportWidth());

  useEffect(() => {
    const onResize = () => setWidth(getViewportWidth());
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);

  const pageSize = useMemo(() => getColumns(width, 'list') * 2, [width]);

  const { list, best, total, loading, error } = useProducts({
    page,
    pageSize,          
    sort,
    search,
  });

  useEffect(() => {
    setPage(1);
  }, [sort, search, pageSize]);


  return (
    <main className="container market">
      <BestProducts items={best} />

      <section className="controls">
        <h3 className="sectionTitle">판매 중인 상품</h3>
        <div className="spacer" />
        <SearchBar onSearch={setSearch} />
        <button className="primaryBtn">상품 등록하기</button>
        <SortDropdown sort={sort} onChange={setSort} />
      </section>

      {loading && <div>로딩중…</div>}
      {error && <div>{error.message}</div>}

      <ProductGrid items={list} />

      <Pagination page={page} total={total} pageSize={pageSize} onChange={setPage} />
    </main>
  );
}
