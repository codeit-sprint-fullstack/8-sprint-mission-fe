// src/hooks/useProducts.js
import { useEffect, useState } from 'react';

const BASE_URL = 'https://panda-market-api.vercel.app';

export default function useProducts(query) {
  const [state, setState] = useState({
    items: [],
    total: 0,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const run = async () => {
      setState(s => ({ ...s, loading: true, error: null }));
      try {
        const params = new URLSearchParams();
        if (query?.page) params.set('page', query.page);
        if (query?.pageSize) params.set('pageSize', query.pageSize);
        if (query?.sortBy) params.set('sortBy', query.sortBy);       // 'createdAt' | 'favorite'
        if (query?.order) params.set('order', query.order);           // 'asc' | 'desc'
        if (query?.q) params.set('q', query.q);                       // 검색어

        const res = await fetch(`${BASE_URL}/products?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('상품을 불러오지 못했습니다');

        // API 응답 가정: { items, total, page, pageSize }
        const data = await res.json();

        // 혹시 total이 헤더로 올 수도 있으니 대비
        const headerTotal = Number(res.headers.get('x-total-count') || 0);
        setState({
          items: data.items ?? data ?? [],
          total: data.total ?? headerTotal ?? 0,
          loading: false,
          error: null,
        });
      } catch (e) {
        if (e.name !== 'AbortError') {
          setState(s => ({ ...s, loading: false, error: e.message || '에러' }));
        }
      }
    };
    run();
    return () => controller.abort();
  }, [JSON.stringify(query)]);

  return state;
}
