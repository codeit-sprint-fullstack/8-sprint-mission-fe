const BASE = 'https://panda-market-api.vercel.app';

function toQuery(params) {
  const usp = new URLSearchParams();

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v).trim() !== '') {
      usp.set(k, String(v));
    }
  });

  usp.set('_ts', String(Date.now()));
  return usp.toString();
}

async function fetchJSON(url, options) {
  const res = await fetch(url, { ...options });
  
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API 오류(${res.status}): ${text || res.statusText}`);
  }

  return res.json();
}

function normalizeListBody(body) {  
  const raw = Array.isArray(body?.list) ? body.list : [];

  const items = raw.map((it) => ({
    id: it.id,
    title: it.name,
    description: it.description ?? '',
    price: it.price ?? 0,
    tags: it.tags ?? [],
    imgUrl: Array.isArray(it.images) && it.images.length ? it.images[0] : '',
    images: it.images ?? [],
    ownerId: it.ownerId,
    favoriteCount: it.favoriteCount ?? 0,
    createdAt: it.createdAt,
    updatedAt: it.updatedAt,
  }));

  const total = typeof body?.totalCount === 'number' ? body.totalCount : items.length;

  return { items, total };
}

function dedupeById(arr) {
  const map = new Map();
  
  for (const it of arr) if (!map.has(it.id)) map.set(it.id, it);

  return [...map.values()];
}

export async function getProducts({
  order = 'createdAt',
  page = 1,
  pageSize = 10,
  search,
} = {}) {

  const offset = (page - 1) * pageSize;
  const qs = toQuery({ order, offset, limit: pageSize, search, keyword: search });
  const body = await fetchJSON(`${BASE}/products?${qs}`);
  
  let { items, total } = normalizeListBody(body);


  if (order === 'favorite') {
    items = items
      .slice()
      .sort(
        (a, b) =>
          (b.favoriteCount || 0) - (a.favoriteCount || 0) ||
          new Date(b.createdAt) - new Date(a.createdAt)
      );
  }

  items = dedupeById(items);
  return { items, total };
}

export async function getBestProducts({ limit = 4 } = {}) {
  const qs = toQuery({ order: 'favorite', offset: 0, limit });
  const body = await fetchJSON(`${BASE}/products?${qs}`);
  const { items } = normalizeListBody(body);

  const sorted = items
    .slice()
    .sort(
      (a, b) =>
        (b.favoriteCount || 0) - (a.favoriteCount || 0) ||
        new Date(b.createdAt) - new Date(a.createdAt)
    );

  return dedupeById(sorted).slice(0, limit);
}
