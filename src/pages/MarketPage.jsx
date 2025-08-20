import { useEffect, useMemo, useState } from 'react';
import useBreakpoint from '../hooks/useBreakpoint';
import useProducts from '../hooks/useProducts';
import '../styles/market.css';

function formatPrice(v) {
    return `₩${v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export default function MarketPage() {
    const { current } = useBreakpoint();

    const columns = useMemo(() => {
        const best = current === 'desktop' ? 4 : current === 'tablet' ? 2 : 1;
        const all = current === 'desktop' ? 5 : current === 'tablet' ? 3 : 2;
        return { best, all };
    }, [current]);

    const rows = useMemo(() => ({ best: 2, all: 2 }), []);

    const pageSize = useMemo(
        () => ({
            best: columns.best * rows.best,
            all: columns.all * rows.all,
        }),
        [columns, rows],
    );

    // controls
    const [order, setOrder] = useState('latest');
    const [query, setQuery] = useState('');
    const [pageAll, setPageAll] = useState(1);

    // reset page when responsive or controls change
    useEffect(() => setPageAll(1), [pageSize.all, order, query]);

    // best: favorite order
    const { data: bestList, loading: bestLoading } = useProducts({
        page: 1,
        pageSize: pageSize.best,
        order: 'favorite',
        name: '',
    });

    // all products
    const {
        data: allList,
        totalCount,
        loading: allLoading,
        error: allError,
    } = useProducts({
        page: pageAll,
        pageSize: pageSize.all,
        order,
        name: query,
    });

    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize.all));

    const pageWindow = (current, total, size = 5) => {
        const half = Math.floor(size / 2);
        let start = Math.max(1, current - half);
        let end = Math.min(total, start + size - 1);
        if (end - start + 1 < size) start = Math.max(1, end - size + 1);
        const arr = [];
        for (let i = start; i <= end; i++) arr.push(i);
        return arr;
    };

    return (
        <main>
            <div className="wrapper">
                <h2 className="section-title">베스트 상품</h2>
                <div
                    className="grid"
                    style={{
                        gridTemplateColumns: `repeat(${columns.best}, minmax(0,1fr))`,
                    }}
                >
                    {bestLoading
                        ? Array.from({ length: pageSize.best }).map((_, i) => (
                              <article key={i} className="card">
                                  <div
                                      className="thumb"
                                      style={{
                                          background: '#f3f3f3',
                                          height: 0,
                                          paddingBottom: '100%',
                                      }}
                                  />
                                  <div className="meta">로딩...</div>
                              </article>
                          ))
                        : bestList.map((item) => (
                              <article key={item.id} className="card">
                                  <img
                                      className="thumb"
                                      src={
                                          item.images?.[0] ||
                                          '/images/img_panda_face.svg'
                                      }
                                      alt={item.name}
                                  />
                                  <div className="meta">
                                      <div style={{ fontWeight: 600 }}>
                                          {item.name}
                                      </div>
                                      <div>{formatPrice(item.price)}</div>
                                      <div
                                          style={{
                                              fontSize: 12,
                                              color: '#666',
                                          }}
                                      >
                                          좋아요 {item.favoriteCount}
                                      </div>
                                  </div>
                              </article>
                          ))}
                </div>

                <div className="controlbar">
                    <input
                        type="search"
                        placeholder="상품명을 입력하세요"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') setPageAll(1);
                        }}
                        aria-label="상품 검색"
                    />
                    <select
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                    >
                        <option value="latest">최신 순</option>
                        <option value="favorite">좋아요 순</option>
                    </select>
                    <button type="button" onClick={() => setPageAll(1)}>
                        검색
                    </button>
                    <span style={{ marginLeft: '8px', color: '#666' }}>
                        페이지 크기: {pageSize.all}
                    </span>
                </div>

                <h2 className="section-title">전체 상품</h2>
                {allError ? (
                    <div style={{ padding: 24, color: 'crimson' }}>
                        데이터를 불러오는 중 오류가 발생했습니다.
                    </div>
                ) : (
                    <div
                        className="grid"
                        style={{
                            gridTemplateColumns: `repeat(${columns.all}, minmax(0,1fr))`,
                        }}
                    >
                        {allLoading ? (
                            Array.from({ length: pageSize.all }).map((_, i) => (
                                <article key={i} className="card">
                                    <div
                                        className="thumb"
                                        style={{
                                            background: '#f3f3f3',
                                            height: 0,
                                            paddingBottom: '100%',
                                        }}
                                    />
                                    <div className="meta">로딩...</div>
                                </article>
                            ))
                        ) : allList.length === 0 ? (
                            <div style={{ padding: 24, color: '#666' }}>
                                검색 결과가 없습니다.
                            </div>
                        ) : (
                            allList.map((item) => (
                                <article key={item.id} className="card">
                                    <img
                                        className="thumb"
                                        src={
                                            item.images?.[0] ||
                                            '/images/img_panda_face.svg'
                                        }
                                        alt={item.name}
                                    />
                                    <div className="meta">
                                        <div style={{ fontWeight: 600 }}>
                                            {item.name}
                                        </div>
                                        <div>{formatPrice(item.price)}</div>
                                        <div
                                            style={{
                                                fontSize: 12,
                                                color: '#666',
                                            }}
                                        >
                                            좋아요 {item.favoriteCount}
                                        </div>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>
                )}

                <nav className="pagination" aria-label="상품 페이지네이션">
                    <button
                        onClick={() => setPageAll((p) => Math.max(1, p - 1))}
                        disabled={pageAll <= 1}
                        aria-label="이전 페이지"
                    >
                        〈
                    </button>
                    {pageWindow(pageAll, totalPages).map((n) => (
                        <button
                            key={n}
                            onClick={() => setPageAll(n)}
                            aria-current={n === pageAll ? 'page' : undefined}
                            style={n === pageAll ? { fontWeight: 700 } : {}}
                        >
                            {n}
                        </button>
                    ))}
                    <button
                        onClick={() =>
                            setPageAll((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={pageAll >= totalPages}
                        aria-label="다음 페이지"
                    >
                        〉
                    </button>
                </nav>
            </div>
        </main>
    );
}
