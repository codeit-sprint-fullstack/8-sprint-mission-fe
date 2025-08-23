import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import { getProductList } from '../services/productService';
import searchIcon from '../assets/search-icon.svg';
import '../styles/items.css';

export default function ItemsPage() {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [rawKeyword, setRawKeyword] = useState('');
  const [keyword, setKeyword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const prev = document.body.getAttribute('data-route') || '';
    document.body.setAttribute('data-route', 'items');
    return () => document.body.setAttribute('data-route', prev);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setKeyword(rawKeyword.trim()), 300);
    return () => clearTimeout(id);
  }, [rawKeyword]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getProductList({
          page: currentPage,
          pageSize: 10,
          keyword,
          orderBy: 'recent',
        });
        if (!cancelled) {
          setProducts(res?.products || []);
          setTotalPages(res?.totalPages || 1);
        }
      } catch (e) {
        console.error('[getProductList] 실패', e);
      }
    })();
    return () => { cancelled = true; };
  }, [currentPage, keyword]);

  const DEFAULT_IMG =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><rect width="160" height="160" rx="12" fill="%23f3f4f6"/><path d="M40 108l24-30 18 22 12-14 22 22H40z" fill="%23d1d5db"/><circle cx="64" cy="64" r="10" fill="%23e5e7eb"/></svg>';
  
  const normalized = useMemo(
    () =>
    (products || []).map((p) => {
      const image = p.imageUrl || p.image || p.thumnail || p.thumb || DEFAULT_IMG;
      return {
        _id: p.id || p._id,
        _imageSafe: image,
        _name: p.name || '상품명',
        _price: Number(p.price || 0),
      };
    }),
  [products]
  );

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const formatPrice = (n) => (Number(n) || 0).toLocaleString('ko-KR') + '원';

  return (
    <>
      <Header />

      <main className="items-page">
        <div className="items-container">
          <div className="items-header">
            <h1 className="items-title">판매 중인 상품</h1>

            <div className="items-actions">
              <div className="items-search-wrap">
                <img src={searchIcon} alt="" className="items-search-icon" />
                <input
                  className="items-search"
                  placeholder="검색할 상품을 입력해주세요"
                  value={rawKeyword}
                  onChange={(e) => {
                    setRawKeyword(e.target.value);
                    setCurrentPage(1);
                  }}
                  aria-labe="상품 검색"
                />
              </div>

              <button
                className="items-new-btn"
                onClick={() => navigate('/registration')}
                type="button"
              >
                상품 등록하기
              </button>

              <select className="items-sort" value="recent" disabled>
                <option value="recent">최신순</option>
              </select>
            </div>
          </div>

          <div className="items-grid">
            {normalized.map((p) => (
              <div
                key={p.id || p._id}
                className="item-card"
                onClick={() => navigate(`/items/${p.id || p._id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigate(`/items/${p.id || p._id}`);
                }}
              >
                <div className="item-thumb-wrap">
                  <img
                    className="item-thumb"
                    src={p._imageSafe}
                    alt={p.name || '상품 이미지'}
                    onError={(e) => {
                      if (e.currentTarget.src !== DEFAULT_IMG) {
                        e.currentTarget.src = DEFAULT_IMG;
                      }
                    }}
                  />
                </div>
                
                <div className="item-info">
                  <div className="item-name">{p._name}</div>
                  <div className="item-price">{formatPrice(p._price)}</div>
                  <p className="item-likes">♡ 240</p>
                </div>
              </div>
            ))}

            {normalized.length === 0 && (
              <div className="items-empty">검색 결과가 없습니다.</div>
            )}
          </div>

          <div className="pagination-host">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}