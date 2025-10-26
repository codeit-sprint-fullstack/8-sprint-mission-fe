import { defaultFetch } from "./fetchClient";

const PRODUCT_API_URL = "/products";

const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}`;
};

// 상품 목록 조회
export const fetchProducts = async () => {
  const data = await defaultFetch(PRODUCT_API_URL);
  return (data.list ?? []).map((p) => ({
    ...p,
    createdAt: formatDate(p.createdAt),
    updatedAt: formatDate(p.updatedAt),
  }));
};

// 상품 상세 조회
export const fetchProduct = async (id) => {
  const data = await defaultFetch(`${PRODUCT_API_URL}/${id}`);
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
  return defaultFetch(PRODUCT_API_URL, {
    method: "POST",
    body: JSON.stringify(newProduct),
  });
};

// 상품 수정
export const updateProduct = async (id, product) => {
  return defaultFetch(`${PRODUCT_API_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(product),
  });
};

// 상품 삭제
export const deleteProduct = async (id) => {
  return defaultFetch(`${PRODUCT_API_URL}/${id}`, {
    method: "DELETE",
  });
};
