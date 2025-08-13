import { useEffect, useState } from "react";

const API_BASE = "https://panda-market-api.vercel.app";

const pickImageSrc = (row) =>
  row.image ||
  row.thumbnail ||
  row.imageUrl ||
  (Array.isArray(row.images) ? row.images[0] : "") ||
  "/fallback-product.png";

async function fetchProducts({ page, pageSize, orderBy, keyword }) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    orderBy: orderBy === "like" ? "favorite" : orderBy,
    keyword: keyword || "",
  });
  const res = await fetch(`${API_BASE}/products?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  const list = Array.isArray(data.list) ? data.list : [];
  return {
    list: list.map((r) => ({
      id: r.id,
      name: r.name,
      price: r.price,
      imageSrc: pickImageSrc(r),
    })),
    totalCount: data.totalCount ?? 0,
  };
}

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
