import { useState, useEffect } from "react";
import { fetchArticles } from "@/api/articles";

export function useArticles(page = 1, limit = 10) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArticles({ page, limit });
  }, [page, limit]);

  const loadArticles = async (params = { page, limit }) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchArticles(params);
      setArticles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { articles, loading, error, loadArticles };
}
