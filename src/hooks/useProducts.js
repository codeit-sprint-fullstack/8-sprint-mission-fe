import { useEffect, useState } from 'react';
import { getProducts, getBestProducts } from '../services/productService';

export default function useProducts({ page, pageSize, sort, search }) {
  const [list, setList] = useState([]);
  const [best, setBest] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;

    async function run() {
      setLoading(true);
      setError(null);
      try {
        const { items, total } = await getProducts({ order: sort, page, pageSize, search });
        if (!alive) return;
        setList(items);
        setTotal(total);
      } catch (e) {
        if (!alive) return;
        setError(e);
      } finally {
        if (alive) setLoading(false);
      }
    }

    async function runBest() {
      try {
        const items = await getBestProducts({ limit: 4 }); // ✅ 여기 4개
        if (!alive) return;
        setBest(items);
      } catch {}
    }

    run();
    runBest();
    return () => {
      alive = false;
    };
  }, [page, pageSize, sort, search]);

  return { list, best, total, loading, error };
}
