import { useState } from "react";
import { fetchArticles } from "@/api/articles";
import { Article, UseCursorParams } from "@/types/entities";

export function useArticles(initLimit = 10) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(initLimit);

  const loadArticles = async (params: UseCursorParams = { cursor, limit }) => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      setError(null);
      const data: Article[] = await fetchArticles(params);

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setArticles((prev) => [...prev, ...data]);

      const lastArticle = data[data.length - 1];
      setCursor(lastArticle.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const resetArticles = (): void => {
    setArticles([]);
    setCursor(undefined);
    setHasMore(true);
  };

  return {
    articles,
    loading,
    error,
    loadArticles,
    resetArticles,
    hasMore,
  };
}
