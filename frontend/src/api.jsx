import axios from "axios";

// const BASE_URL = "https://panda-market-api.vercel.app";

// export async function getProductList() {
//   // fetch로 데이터를 받아오는 함수 + order query
//   // const query = `order=${order}&offset=${offset}&limit=${limit}`;
//   const response = await fetch(`${BASE_URL}/products`);
//   if (!response.ok) {
//     //reponse 상태를 체크해서 오류가 있으면 오류를 넘긴다
//     throw new Error("리뷰를 불러오는데 실패했습니다");
//   }
//   const body = await response.text();
//   return body;
// }

export const instance = axios.create({
  baseURL: 'https://panda-market-api.vercel.app/',
});

export async function getProductList(params = {}) {
  const res = await instance.get('/products', {
    params,
  });

  // 상태 코드 확인 (200~299 범위만 성공)
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`제품을 불러오는데 실패했습니다. (status: ${res.status})`);
  }
  return res.data;
}
