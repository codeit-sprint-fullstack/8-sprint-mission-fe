import { requestAwait, baseURL } from './request.js';

export async function getProductList({ page, pageSize, orderBy, keyword } = {}) {
  const url = new URL('products', baseURL);
  if (page) url.searchParams.append("page", page);
  if (pageSize) url.searchParams.append("pageSize", pageSize);
  if (orderBy) url.searchParams.append("orderBy", orderBy);
  if (keyword) url.searchParams.append("keyword", keyword);

  return await requestAwait(url, { method: "GET" }, "상품 목록을 불러오는데 실패했습니다.");
}

export async function getProduct(productId) {
  if (typeof productId !== "number" || !Number.isFinite(productId)) {  // isFinite: productId가 유한한 숫자인지 검사, JS 내장함수
    throw new Error("Invalid product ID");
  }

  const url = new URL(`products/${productId}`, baseURL);

  return await requestAwait(
    url,
    { method: "GET" },
    "상품 정보를 불러오는데 실패했습니다."
  );
}