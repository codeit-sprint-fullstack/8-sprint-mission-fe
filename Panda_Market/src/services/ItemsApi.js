const LS_KEY = "__panda_items__";

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || [];
  } catch {
    return [];
  }
}
function writeAll(list) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

export function clearAll() {
  localStorage.removeItem(LS_KEY);
}

export function seedDemoItems(n = 60) {
  if (readAll().length > 0) return;

  const now = Date.now();
  const demo = Array.from({ length: n }).map((_, i) => ({
    id: (crypto.randomUUID && crypto.randomUUID()) || String(now - i),
    title: `로봇 청소기 ${i + 1}`,
    price: 1500000,
    image: "",
    description: "개발용 더미 데이터",
    createdAt: now - i * 3600_000,
  }));

  writeAll(demo);
}

export function resolveImage(src) {
  const s = String(src || "").trim();
  if (!s) return "/images/img_default.png";
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("/")) return s;
  if (s.toLowerCase().startsWith("images/")) return `/${s}`;
  return `/images/${s}`;
}

export async function getItemsPage({ page = 1, pageSize = 10, query = "" } = {}) {
  const q = String(query || "").trim().toLowerCase();
  const all = readAll()
    .filter((it) => (q ? String(it.title || "").toLowerCase().includes(q) : true))
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const items = all.slice(start, start + pageSize);

  return { items, total, page: safePage, pageSize, totalPages };
}

export async function createItem(payload) {
  const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
  const now = Date.now();
  const item = {
    id,
    title: String(payload?.title ?? "").trim(),
    price: Number(payload?.price ?? 0),
    image: String(payload?.image ?? "").trim(),
    description: String(payload?.description ?? "").trim(),
    createdAt: now,
  };
  const list = readAll();
  list.push(item);
  writeAll(list);
  return item;
}