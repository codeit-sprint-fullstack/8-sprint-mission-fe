import React, { useEffect, useMemo, useState } from 'react';
import { getProductList } from '../../ProductService.js';
import ProductCard from './ProductCard.jsx';

export default function ProductSection({
  title,
  showToolbar = false,
  defaultSort = 'latest',
  cols = { desktop: 5, tablet: 3, mobile: 2 },
  limit,
  pageSizeMap,
}) {
  const [bp, setBp] = useState('desktop');
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setBp(w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop');
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState(defaultSort);

  const pageSize = useMemo(() => {
    if (!pageSizeMap) return undefined;
    return pageSizeMap[bp] ?? pageSizeMap.desktop;
  }, [bp, pageSizeMap]);

  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    getProductList({ page, pageSize, keyword, sort })
      .then((res) => {
        if (!alive) return;
        const list = Array.isArray(res) ? res : (res.items ?? []);
        const tp = !Array.isArray(res) && res.totalPages ? res.totalPages : 1;
        console.log('[ProductSection:parsed]', { count: list.length, totalPages: tp, sample: list[0] });
        setItems(list);
        setTotalPages(tp);
      })
      .catch((err) => console.error(`[${title}]`, err.message))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [page, pageSize, keyword, sort, title]);

  const visible = useMemo(() => (limit ? items.slice(0, limit) : items), [items, limit]);

  const pages = useMemo(() => {
    const win = 5;
    const half = Math.floor(win / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, start + win - 1);
    if (end - start + 1 < win) start = Math.max(1, end - win + 1);
    return Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => start + i);
  }, [page, totalPages]);

  const toPage = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    setPage(p);
    const el = document.querySelector('.section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="section">
      <div className="section_head">
        <h2>{title}</h2>
        {showToolbar && (
          <div className="toolbar">
            <input
              placeholder="      검색할 상품을 입력해주세요"
              value={keyword}
              onChange={(e) => { setPage(1); setKeyword(e.target.value); }}
            />
            <button className="primary">상품 등록하기</button>
            <select
              value={sort}
              onChange={(e) => { setPage(1); setSort(e.target.value); }}
            >
              <option value="latest">최신순</option>
              <option value="favorite">좋아요순</option>
            </select>
          </div>
        )}
      </div>

      {loading && <p className="muted">불러오는 중…</p>}

      {!loading && items.length === 0 && (
        <p className="muted">상품이 없습니다.</p>
      )}

      <div className="grid"
        data-bp={bp}
        style={{ gridTemplateColumns: `repeat(${cols[bp] ?? cols.desktop}, minmax(0,1fr))` }}>
        {visible.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      {showToolbar && totalPages > 1 && (
        <nav className="pagination">
          <button
            className="page-btn"
            disabled={page === 1}
            onClick={() => toPage(page - 1)}
          >
            &lt;
          </button>

          {pages.map((p) => (
            <button
              key={p}
              className={`page-btn ${p === page ? 'active' : ''}`}
              onClick={() => toPage(p)}
            >
              {p}
            </button>
          ))}

          <button
            className="page-btn"
            disabled={page === totalPages}
            onClick={() => toPage(page + 1)}
          >
            &gt;
          </button>
        </nav>
      )}
    </section>
  );
}
