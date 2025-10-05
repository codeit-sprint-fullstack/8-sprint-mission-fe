// hooks/useArticles.js
import { useState, useEffect } from "react";
import { fetchArticles } from "@/api/articles";

export function useArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async (params = {}) => {
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
