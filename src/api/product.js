const API_URL = "https://panda-market-api.vercel.app/products";

const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}`;
};

// 상품 목록 조회
export const fetchProducts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("상품 목록 가져오기 실패");
  }
  const data = await res.json();

  return (data.list ?? []).map((p) => ({
    ...p,
    createdAt: formatDate(p.createdAt),
    updatedAt: formatDate(p.updatedAt),
  }));
};

// 상품 상세 조회
export const fetchProduct = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) {
    throw new Error("상품 가져오기 실패");
  }
  const data = await res.json();

  return {
    ...data,
    nickname: data.nickname ?? "테스트판매자",
    createdAt: formatDate(data.createdAt),
    updatedAt: formatDate(data.updatedAt),
  };
};

// 상품 등록
export const addProduct = async ({
  title,
  price,
  description,
  tags,
  images,
}) => {
  const newProduct = { title, price, description, tags, images };
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });

  if (!res.ok) {
    throw new Error("상품 등록 실패");
  }
  return await res.json();
};

// 상품 수정
export const updateProduct = async (
  id,
  { title, price, description, tags, images }
) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, price, description, tags, images }),
  });

  if (!res.ok) {
    throw new Error("상품 수정 실패");
  }
  return await res.json();
};

// 상품 삭제
export const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error("상품 삭제 실패");
  }
  return true;
};
