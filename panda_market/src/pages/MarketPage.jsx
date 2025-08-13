import { useEffect, useMemo, useState } from 'react';
import useBreakpoint from '../hooks/useBreakpoint';
import '../styles/market.css';

export default function MarketPage() {
    const { current } = useBreakpoint();

    const columns = useMemo(() => {
        const best = current === 'desktop' ? 4 : current === 'tablet' ? 2 : 1;
        const all = current === 'desktop' ? 5 : current === 'tablet' ? 3 : 2;
        return { best, all };
    }, [current]);

    const rows = {
        best: 2,
        all: 2,
    };

    const pageSize = useMemo(
        () => ({
            best: columns.best * rows.best,
            all: columns.all * rows.all,
        }),
        [columns],
    );

    const [pageAll, setPageAll] = useState(1);

    useEffect(() => {
        setPageAll(1);
    }, [pageSize.all]);

    const placeholderBest = Array.from({ length: pageSize.best }, (_, i) => ({
        id: `best-${i + 1}`,
    }));
    const placeholderAll = Array.from({ length: pageSize.all }, (_, i) => ({
        id: `all-${i + 1 + (pageAll - 1) * pageSize.all}`,
    }));

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
                    {placeholderBest.map((item) => (
                        <article key={item.id} className="card">
                            <img
                                className="thumb"
                                src="/images/img_sample_img.webp"
                                alt=""
                            />
                            <div className="meta">
                                <div style={{ fontWeight: 600 }}>상품명</div>
                                <div>₩0</div>
                                <div style={{ fontSize: 12, color: '#666' }}>
                                    좋아요 0
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="controlbar">
                    <input type="search" placeholder="상품명을 입력하세요" />
                    <select defaultValue="latest">
                        <option value="latest">최신 순</option>
                        <option value="favorite">좋아요 순</option>
                    </select>
                    <button type="button">검색</button>
                    <span style={{ marginLeft: '8px', color: '#666' }}>
                        페이지 크기: {pageSize.all}
                    </span>
                </div>

                <h2 className="section-title">전체 상품</h2>
                <div
                    className="grid"
                    style={{
                        gridTemplateColumns: `repeat(${columns.all}, minmax(0,1fr))`,
                    }}
                >
                    {placeholderAll.map((item) => (
                        <article key={item.id} className="card">
                            <img
                                className="thumb"
                                src="/images/img_sample_img.webp"
                                alt=""
                            />
                            <div className="meta">
                                <div style={{ fontWeight: 600 }}>상품명</div>
                                <div>₩0</div>
                                <div style={{ fontSize: 12, color: '#666' }}>
                                    좋아요 0
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {}
                <nav className="pagination" aria-label="상품 페이지네이션">
                    <button
                        onClick={() => setPageAll((p) => Math.max(1, p - 1))}
                    >
                        〈
                    </button>
                    <button aria-current="page">{pageAll}</button>
                    <button onClick={() => setPageAll((p) => p + 1)}>〉</button>
                </nav>
            </div>
        </main>
    );
}
