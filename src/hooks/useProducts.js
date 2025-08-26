import { useEffect, useState } from "react";
import { getProducts } from "../api/products";

/**
 * 판매 중인 상품 조회 훅
 * - 3번 명세: 내가 만든 GET 메서드(getProducts)를 사용
 */
export function useProducts({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
} = {}) {
  const [data, setData] = useState({ list: [], totalCount: 0 });
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(false);

    getProducts({ page, pageSize, orderBy, keyword })
      .then((d) => alive && setData(d))
      .catch(() => alive && setError(true))
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, [page, pageSize, orderBy, keyword]);

  return { data, isLoading, isError };
}
