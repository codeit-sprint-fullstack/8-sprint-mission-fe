import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";

export function useProducts(opts) {
  const {
    page = 1,
    pageSize = 10,
    orderBy = "recent",
    keyword = "",
  } = opts || {};
  const [data, setData] = useState({ list: [], totalCount: 0 });
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(false);
    fetchProducts({ page, pageSize, orderBy, keyword })
      .then((d) => alive && setData(d))
      .catch(() => alive && setError(true))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [page, pageSize, orderBy, keyword]);

  return { data, isLoading, isError };
}

export function useBestProducts(pageSize = 8) {
  return useProducts({ page: 1, pageSize, orderBy: "favorite", keyword: "" });
}
