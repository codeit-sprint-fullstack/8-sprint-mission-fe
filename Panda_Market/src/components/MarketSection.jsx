import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getItemsPage, seedDemoItems } from "../services/ItemsApi.js";
import ProductCard from "./ProductCard.jsx"; 


export default function MarketSection({
  title = "판매 중인 상품",
  showToolbar = true,
  cols = { desktop: 5, tablet: 3, mobile: 2 },
  pageSizeMap = { desktop: 10, tablet: 6, mobile: 4 },
}) {

  useEffect(() => {
  seedDemoItems(60);
  }, []);

  const [bp, setBp] = useState("desktop");
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setBp(w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const pageSize = useMemo(() => pageSizeMap[bp] ?? pageSizeMap.desktop, [bp, pageSizeMap]);

  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    getItemsPage({ page, pageSize, query: keyword })
      .then((res) => {
        if (!alive) return;
        setItems(res.items || []);
        setTotalPages(res.totalPages || 1);
      })
      .catch((err) => console.error("[MarketSection]", err))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [page, pageSize, keyword]);

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
    const el = document.querySelector(".section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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
              onChange={(e) => {
                setPage(1);
                setKeyword(e.target.value);
              }}
            />
            <Link to="/registration" className="primary">상품 등록하기</Link>
            <select value="latest" readOnly>
              <option value="latest">최신순</option>
            </select>
          </div>
        )}
      </div>

      {loading && <p className="muted">불러오는 중…</p>}
      {!loading && items.length === 0 && <p className="muted">상품이 없습니다.</p>}

      <div
        className="grid"
        data-bp={bp}
        style={{ gridTemplateColumns: `repeat(${cols[bp] ?? cols.desktop}, minmax(0,1fr))` }}
      >
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {showToolbar && totalPages > 1 && (
        <nav className="pagination">
          <button className="page-btn" disabled={page === 1} onClick={() => toPage(page - 1)}>
            &lt;
          </button>

          {pages.map((p) => (
            <button
              key={p}
              className={`page-btn ${p === page ? "active" : ""}`}
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