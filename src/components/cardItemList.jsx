import { useMemo, useState, useEffect } from "react";
import { useBestProducts, useProducts } from "../hooks/useProducts.js";
import { useResponsivePageSize } from "../hooks/useResponsivePageSize.js";
import "../css/cardItemList.css";

/* 페이지네이션 윈도우 계산 */
const getPageWindow = (current, total, win = 5) => {
  const half = Math.floor(win / 2);
  let start = Math.max(1, current - half);
  let end = start + win - 1;
  if (end > total) {
    end = total;
    start = Math.max(1, end - win + 1);
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export default function CardItemList() {
  const [pageCnt, setPageCnt] = useState(1);
  const [sort, setSort] = useState("recent");
  const [rawKeyword, setRawKeyword] = useState("");
  const [keyword, setKeyword] = useState("");

  /* 반응형: 열 수에 맞춰 pageSize 조정 */
  const bestR = useResponsivePageSize("best"); // 4/2/1
  const listR = useResponsivePageSize("list"); // 5/3/2

  /* 데이터 */
  const { data: bestData } = useBestProducts(bestR.pageSize);
  const { data, isLoading, isError } = useProducts({
    page: pageCnt,
    pageSize: listR.pageSize,
    orderBy: sort,
    keyword,
  });

  /* 총 페이지 계산 */
  const totalPages = useMemo(() => {
    const total = data?.totalCount || 0;
    return Math.max(1, Math.ceil(total / listR.pageSize));
  }, [data?.totalCount, listR.pageSize]);

  /* 브레이크포인트로 pageSize 바뀔 때 현재 페이지 보정 */
  useEffect(() => {
    const total = data?.totalCount || 0;
    const maxPage = Math.max(1, Math.ceil(total / listR.pageSize));
    if (pageCnt > maxPage) setPageCnt(maxPage);
  }, [listR.pageSize, data?.totalCount]);

  /* 검색 디바운스  */
  useEffect(() => {
    const id = setTimeout(() => {
      setKeyword(rawKeyword);
      setPageCnt(1);
    }, 300);
    return () => clearTimeout(id);
  }, [rawKeyword]);

  const pages = getPageWindow(pageCnt, totalPages, 5);

  return (
    <div className="ProductListContainer">
      <h2>베스트 상품</h2>
      <div className="productGrid best">
        {(bestData?.list || []).map((row) => (
          <div key={row.id} className="productCard">
            <img
              className="card-thumb"
              src={row.imageSrc || "/fallback-product.png"}
              alt={row.name}
              onError={(e) => (e.currentTarget.src = "/fallback-product.png")}
            />
            <div className="card-title">{row.name}</div>
            <div className="card-price">
              {Number(row.price || 0).toLocaleString()}원
            </div>
            <div className="card-meta">
              <span>♡</span>
              <span>240</span>
            </div>
          </div>
        ))}
      </div>

      <div className="section-header">
        <h2>판매 중인 상품</h2>
        <div className="toolbar">
          <div className="search">
            <input
              placeholder="검색할 상품을 입력해주세요"
              value={rawKeyword}
              onChange={(e) => setRawKeyword(e.target.value)}
            />
          </div>
          <button className="primary">상품 등록하기</button>
          <div className="sortSelect">
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPageCnt(1);
              }}
            >
              <option value="recent">최신순</option>
              <option value="like">좋아요순</option>
            </select>
          </div>
        </div>
      </div>

      {isError && <div>목록을 불러오지 못했습니다.</div>}
      {isLoading && <div>불러오는 중입니다.</div>}
      {!isLoading && !isError && (
        <>
          <div className="productGrid all">
            {(data?.list || []).map((row) => (
              <div key={row.id} className="productCard">
                <img
                  className="card-thumb"
                  src={row.imageSrc || "/fallback-product.png"}
                  alt={row.name}
                  onError={(e) =>
                    (e.currentTarget.src = "/fallback-product.png")
                  }
                />
                <div className="card-title">{row.name}</div>
                <div className="card-price">
                  {Number(row.price || 0).toLocaleString()}원
                </div>
                <div className="card-meta">
                  <span>♡</span>
                  <span>240</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination pagination--numbers">
            <button
              className="pg-btn"
              disabled={pageCnt <= 1}
              onClick={() => setPageCnt((p) => Math.max(1, p - 1))}
              aria-label="이전 페이지"
            >
              ‹
            </button>

            {pages.map((n) => (
              <button
                key={n}
                className={`pg-btn ${n === pageCnt ? "active" : ""}`}
                onClick={() => setPageCnt(n)}
                aria-current={n === pageCnt ? "page" : undefined}
              >
                {n}
              </button>
            ))}

            <button
              className="pg-btn"
              disabled={pageCnt >= totalPages}
              onClick={() => setPageCnt((p) => Math.min(totalPages, p + 1))}
              aria-label="다음 페이지"
            >
              ›
            </button>
          </div>
        </>
      )}
    </div>
  );
}
