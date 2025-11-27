import { useState, useEffect } from "react";
import { fetchArticles } from "@/api/articles";
import { Article, UseParams } from "@/types/entities";

export function useArticles(initPage = 1, initLimit = 10) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initPage);
  const [limit, setLimit] = useState<number>(initLimit);

  const loadArticles = async (params: UseParams = {}): Promise<void> => {
    const { page: p = page, limit: l = limit } = params;

    try {
      setLoading(true);
      setError(null);
      const data: Article[] = await fetchArticles({ page: p, limit: l });
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles({ page, limit });
  }, [page, limit]);

  return {
    articles,
    loading,
    error,
    loadArticles,
    page,
    limit,
    setPage,
    setLimit,
  };
}
