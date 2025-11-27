import { defaultFetch } from "./fetchClient";
import { Product, ProductInput } from "@/types/entities";

const PRODUCT_API_URL = "/products";

const formatDate = (date: string) => {
  const d = new Date(date);
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}`;
};

// 상품 목록 조회
export const fetchProducts = async (): Promise<Product[]> => {
  const data = await defaultFetch<{ list: Product[] }>(PRODUCT_API_URL);
  return (data.list ?? []).map((p) => ({
    ...p,
    createdAt: formatDate(p.createdAt!),
    updatedAt: formatDate(p.updatedAt!),
  }));
};

// 상품 상세 조회
export const fetchProduct = async (
  id: string
): Promise<Product & { nickname: string }> => {
  const data = await defaultFetch<Product & { nickname?: string }>(
    `${PRODUCT_API_URL}/${id}`
  );
  return {
    ...data,
    nickname: data.nickname ?? "테스트판매자",
    createdAt: formatDate(data.createdAt!),
    updatedAt: formatDate(data.updatedAt!),
  };
};

// 상품 등록
export const addProduct = async ({
  title,
  price,
  description,
  tags,
  images,
}: ProductInput): Promise<Product> => {
  const newProduct = { title, price, description, tags, images };
  return defaultFetch<Product>(PRODUCT_API_URL, {
    method: "POST",
    body: JSON.stringify(newProduct),
  });
};

// 상품 수정
export const updateProduct = async (
  id: string,
  product: Partial<ProductInput>
): Promise<Product> => {
  return defaultFetch<Product>(`${PRODUCT_API_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(product),
  });
};

// 상품 삭제
export const deleteProduct = async (
  id: string
): Promise<{ success: boolean }> => {
  return defaultFetch<{ success: boolean }>(`${PRODUCT_API_URL}/${id}`, {
    method: "DELETE",
  });
};
