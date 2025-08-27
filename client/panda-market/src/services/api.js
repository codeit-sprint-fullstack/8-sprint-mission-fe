// src/services/api.js
const BASE_URL = 'https://panda-market-api.vercel.app';

export async function fetchProducts({ page=1, pageSize=20, sortBy='createdAt', order='desc', q='' } = {}) {
  const params = new URLSearchParams();
  params.set('page', page);
  params.set('pageSize', pageSize);
  if (sortBy) params.set('sortBy', sortBy);   // "favorite" or "createdAt"
  if (order) params.set('order', order);      // "asc" or "desc"
  if (q) params.set('q', q);                  // 검색어

  const res = await fetch(`${BASE_URL}/products?${params.toString()}`);
  if (!res.ok) throw new Error('상품을 불러오지 못했습니다');
  const data = await res.json();
  // 보편적으로 { items, total, page, pageSize } 형태를 가정
  return data;
}
