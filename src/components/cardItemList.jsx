// src/components/CardItemList.jsx
import { useMemo, useState, useEffect, useRef } from "react";
import { useProducts } from "../hooks/useProducts.js"; // ← useBestProducts 제거
import { useResponsivePageSize } from "../hooks/useResponsivePageSize.js";
import ProductCard from "./ProductCard.jsx";
import Pagination from "./Pagination.jsx";
import SearchInput from "./SearchInput.jsx";
import SortDropdown from "./SortDropdown.jsx";
import "../css/cardItemList.css";

export default function CardItemList() {
  const [pageCnt, setPageCnt] = useState(1);
  const [sort, setSort] = useState("recent");
  const [keyword, setKeyword] = useState("");

  const bestR = useResponsivePageSize("best");
  const listR = useResponsivePageSize("list");

  // ✅ 같은 훅을 두 번 호출해서 best/list 분리
  const { data: bestData } = useProducts({
    page: 1,
    pageSize: bestR.pageSize,
    orderBy: "favorite",
    keyword: "",
  });

  const { data, isLoading, isError } = useProducts({
    page: pageCnt,
    pageSize: listR.pageSize,
    orderBy: sort,
    keyword,
  });

  const totalPages = useMemo(() => {
    const total = data?.totalCount || 0;
    return Math.max(1, Math.ceil(total / listR.pageSize));
  }, [data?.totalCount, listR.pageSize]);

  // A+ 페이지 보정 (deps에서 pageCnt 제외)
  const prevPageSizeRef = useRef(listR.pageSize);
  useEffect(() => {
    const total = data?.totalCount || 0;
    const prev = prevPageSizeRef.current;
    const next = listR.pageSize;
    if (!prev || prev === next) return;

    const maxPage = Math.max(1, Math.ceil(total / next));
    if (pageCnt > maxPage) {
      if (pageCnt !== maxPage) setPageCnt(maxPage);
    } else if (next < prev) {
      const startIndex = (pageCnt - 1) * prev;
      const newPageFromOffset = Math.floor(startIndex / next) + 1;
      const clamped = Math.min(Math.max(1, newPageFromOffset), maxPage);
      if (clamped !== pageCnt) setPageCnt(clamped);
    }
    prevPageSizeRef.current = next;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listR.pageSize, data?.totalCount]);

  return (
    <div className="ProductListContainer">
      <h2>베스트 상품</h2>
      <div className="productGrid best">
        {(bestData?.list || []).map((row) => (
          <ProductCard key={row.id} {...row} />
        ))}
      </div>

      <div className="section-header">
        <h2>판매 중인 상품</h2>
        <div className="toolbar">
          <SearchInput
            value={keyword}
            onChange={(v) => {
              if (v !== keyword) {
                setKeyword(v);
                setPageCnt(1);
              }
            }}
            debounce={200}
          />
          <button className="primary" type="button">
            상품 등록하기
          </button>
          <SortDropdown
            value={sort}
            onChange={(v) => {
              if (v !== sort) {
                setSort(v);
                setPageCnt(1);
              }
            }}
          />
        </div>
      </div>

      {isError && <div>목록을 불러오지 못했습니다.</div>}
      {isLoading && <div>불러오는 중입니다.</div>}

      {!isLoading && !isError && (
        <>
          <div className="productGrid all">
            {(data?.list || []).map((row) => (
              <ProductCard key={row.id} {...row} />
            ))}
          </div>

          <Pagination
            page={pageCnt}
            totalPages={totalPages}
            onChange={setPageCnt}
            windowSize={5}
          />
        </>
      )}
    </div>
  );
}
