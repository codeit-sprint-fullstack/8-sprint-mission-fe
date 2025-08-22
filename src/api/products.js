const API_BASE =
  import.meta.env.VITE_API_BASE ?? "https://panda-market-api.vercel.app";

export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
} = {}) {
  const allowed = new Set(["recent"]);
  const normalizedOrderBy = allowed.has(orderBy) ? orderBy : "recent";

  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    orderBy: normalizedOrderBy,
    keyword,
  });

  const res = await fetch(`${API_BASE}/products?${params.toString()}`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error(`GET /products failed: ${res.status}`);
  }

  const json = await res.json();
  const list = Array.isArray(json.list) ? json.list : json;

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
