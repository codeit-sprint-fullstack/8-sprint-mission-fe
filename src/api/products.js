const API_BASE = "https://panda-market-api.vercel.app";

const pickImageSrc = (row) =>
  row.image ||
  row.thumbnail ||
  row.imageUrl ||
  (Array.isArray(row.images) ? row.images[0] : "") ||
  "/fallback-product.png";

export async function fetchProducts({ page, pageSize, orderBy, keyword }) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    orderBy: orderBy === "like" ? "favorite" : orderBy,
    keyword: keyword || "",
  });
  const res = await fetch(`${API_BASE}/products?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  const list = Array.isArray(data.list) ? data.list : [];
  return {
    list: list.map((r) => ({
      id: r.id,
      name: r.name,
      price: r.price,
      imageSrc: pickImageSrc(r),
    })),
    totalCount: data.totalCount ?? 0,
  };
}
