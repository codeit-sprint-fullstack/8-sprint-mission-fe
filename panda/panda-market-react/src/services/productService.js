const BASE_URL = 'https://panda-market-api.vercel.app';

export async function getProductList({ page = 1, pageSize = 20, sort = 'recent', keyword = ''}) {
  try {
    const queryParams = new URLSearchParams({
      page,
      pageSize,
      sort,
      keyword,
    });

    const res = await fetch(`${BASE_URL}/products?${queryParams}`);
    if (!res.ok) throw new Error('상품 목록을 불러오는 데 실패했습니다.');

    const data = await res.json();

    return {
      products: data.list,
      totalPages: Math.ceil(data.totalCount / pageSize),
    };
  } catch (err) {
    console.error('[getProductList]', err);
    throw err;
  }
}