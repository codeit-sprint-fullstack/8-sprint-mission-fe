import { useEffect, useMemo, useState } from 'react';
import useBreakpoint from '../hooks/useBreakpoint';
import useProducts from '../hooks/useProducts';
import { Link } from 'react-router-dom';
import '../styles/market.css';

function formatPrice(v) {
    return `₩${v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export default function MarketPage() {
    const { current } = useBreakpoint();

    const columns = useMemo(() => {
        const all = current === 'desktop' ? 5 : current === 'tablet' ? 3 : 2;
        return { all };
    }, [current]);

    const rows = useMemo(() => ({ all: 2 }), []);

    const pageSize = useMemo(
        () => ({ all: columns.all * rows.all }),
        [columns, rows],
    );

    // controls
    const [order, setOrder] = useState('latest');
    const [query, setQuery] = useState('');
    const [pageAll, setPageAll] = useState(1);

    // reset page when responsive or controls change
    useEffect(() => setPageAll(1), [pageSize.all, order, query]);

    // all products (좋아요 정렬 제외)
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
                <div
                    className="controlbar"
                    style={{ justifyContent: 'space-between' }}
                >
                    <h2 className="section-title" style={{ margin: 0 }}>
                        전체 상품
                    </h2>
                </div>
                <div className="controlbar">
                    <input
                        type="search"
                        placeholder="검색할 상품을 입력해주세요"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') setPageAll(1);
                        }}
                        aria-label="상품 검색"
                    />
                    <Link
                        to="/registration"
                        className="button"
                        style={{
                            borderRadius: 8,
                            padding: '8px 12px',
                            fontWeight: 600,
                        }}
                    >
                        상품 등록하기
                    </Link>
                    <select
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                    >
                        <option value="latest">최신 순</option>
                    </select>
                </div>
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
