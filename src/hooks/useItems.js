import { useState, useEffect } from "react";
import { fetchProducts } from "@/api/product";

export function useItems(page = 1, limit = 10) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadItems({ page, limit });
  }, [page, limit]);

  const loadItems = async (params = { page, limit }) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts(params);
      setItems(data);
    } catch (err) {
      console.error("상품 불러오기 실패:", err);
      setError(err.message || "상품을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return { items, loading, error, loadItems };
}
