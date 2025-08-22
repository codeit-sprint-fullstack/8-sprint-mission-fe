const DEFAULT_BASE = 'https://panda-market-api.vercel.app';
const BASE = (process.env.REACT_APP_API_BASE_URL || DEFAULT_BASE).replace(/\/$/, '');
const IS_PUBLIC_PANDA = /panda-market-api\.vercel\.app$/i.test(new URL(BASE).host)

export async function getProductList({
  page = 1,
  pageSize = 20,
  keyword = '',
  orderBy = 'recent',
} = {}) {
  const safePage = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const safeSize = Number.isFinite(Number(pageSize)) && Number(pageSize) > 0 ? Number(pageSize) : 20;
  const trimmedKeyword = (keyword || '').trim();

  let url = '';
  if (IS_PUBLIC_PANDA) {
    const qs = new URLSearchParams({
      page: String(safePage),
      pageSize: String(safeSize),
      orderBy,
    });
    if (trimmedKeyword) qs.set('keyword', trimmedKeyword);
    url = `${BASE}/products?${qs.toString()}`;
  } else {
    const offset = (safePage - 1) * safeSize;
    const qs = new URLSearchParams({
      offset: String(offset),
      limit: String(safeSize),
      orderBy,
    });
    if (trimmedKeyword) qs.set('keyword', trimmedKeyword);
    url = `${BASE}/products?${qs.toString()}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`[getProductList] HTTP ${res.status} ${res.statusText}`);

  const data = await res.json();
  const list = Array.isArray(data?.list) ? data.list : [];

  const totalCount =
    Number.isFinite(Number(data?.totalCount)) ? Number(data.totalCount)
    : Number.isFinite(Number(data?.total)) ? Number(data.total)
    : list.length;

  return {
    products: list,
    totalPages: Math.max(1, Math.ceil(totalCount / safeSize) || 1),
  };
}

export async function createProduct({ name, description, price, tags = [] }) {
  const res = await fetch(`${BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, price, tags }),
  });
  if (!res.ok) throw new Error('상품 등록 실패');
  return res.json();
}

export async function getProduct(id) {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error('상품 조회 실패');
  return res.json();
}