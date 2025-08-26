const API_BASE = (
  import.meta.env.VITE_API_BASE || "https://panda-market-api.vercel.app"
).replace(/\/$/, "");

export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
} = {}) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    orderBy: "recent",
    keyword,
  });

  const url = `${API_BASE}/products?${params.toString()}`;
  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`GET /products failed: ${res.status}`);

  const json = await res.json();
  const list = Array.isArray(json.list)
    ? json.list
    : Array.isArray(json)
    ? json
    : [];

  return {
    list: list.map((r, i) => ({
      id: r.id ?? r._id ?? r.productId ?? `p-${i}`,
      name: r.name ?? r.title ?? "이름 없음",
      price: Number(r.price ?? 0),
      imageSrc:
        r.image ??
        r.thumbnail ??
        r.imageUrl ??
        (Array.isArray(r.images) ? r.images[0] : "") ??
        "",
    })),
    totalCount: json.totalCount ?? list.length ?? 0,
  };
}

export async function createProduct(payload) {
  const body = {
    name: String(payload?.name ?? "").trim(),
    description: String(payload?.description ?? "").trim(),
    price: Number(payload?.price ?? 0),
    tags: Array.isArray(payload?.tags) ? payload.tags : [],
    images: Array.isArray(payload?.images) ? payload.images : [],
  };

  if (!body.name) throw new Error("상품명은 필수입니다.");
  if (!body.description) throw new Error("설명은 필수입니다.");
  if (Number.isNaN(body.price) || body.price < 0)
    throw new Error("가격은 0 이상 숫자여야 합니다.");

  const res = await fetch(`${API_BASE}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`POST /products 실패: ${res.status} ${text}`);
  }

  const created = await res.json();
  const id = created.id ?? created._id ?? created.productId;
  return { ...created, id };
}
