import { useState, useEffect } from "react";
import { fetchProducts } from "@/api/product";
import { ProductCard, UseLimitParams, UseResult } from "@/types/entities";

export function useItems(page = 1, limit = 10): UseResult {
  const [items, setItems] = useState<ProductCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadItems({ page, limit });
  }, [page, limit]);

  const loadItems = async (params: UseLimitParams = { page, limit }) => {
    try {
      setLoading(true);
      setError(null);
      const data: ProductCard[] = await fetchProducts(params);
      setItems(data);
    } catch (err) {
      console.error("상품 불러오기 실패:", err);
      setError(
        err instanceof Error
          ? err.message
          : "상품을 불러오는 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  return { items, loading, error, loadItems };
}
