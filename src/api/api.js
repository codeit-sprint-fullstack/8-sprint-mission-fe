const API_BASE_URL = 'https://panda-market-api.vercel.app';

export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
} = {}) {
  try {
    const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}${keyword ? `&keyword=${encodeURIComponent(keyword)}` : ''}`;
    const response = await fetch(`${API_BASE_URL}/products?${query}`);

    if (!response.ok) {
      throw new Error(`HTTP 오류 발생: ${response.status}`);
    }

    return await response.json(); 
  } catch (error) {
    console.error('상품 데이터를 불러오는 중 오류 발생:', error.message);
    return { totalCount: 0, list: [] };
  }
}
