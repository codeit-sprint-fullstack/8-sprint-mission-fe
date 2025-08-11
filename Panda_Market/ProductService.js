const PRODUCT_BASE = 'https://panda-market-api.vercel.app/products';

// 상품 목록 조회

export async function getProductList({ page = 1, pageSize = 10, keyword = '', sort = 'latest' } = {}) {
  const url = new URL(PRODUCT_BASE);
  url.searchParams.append('page', page);
  url.searchParams.append('pageSize', pageSize);
  if (keyword.trim()) url.searchParams.append('keyword', keyword);
  if (sort === 'favorite' || sort === 'latest') {
    url.searchParams.append('sort', sort);
  }

  try {
    console.log('[getProductList] →', url.toString());
    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`getProductList 실패: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    if (data && Array.isArray(data.list)) {
      const items = data.list;
      const totalCount = Number(data.totalCount ?? items.length) || items.length;
      const size = Number(pageSize) || 10;
      const totalPages = Math.ceil(totalCount / size);
      return { items, totalPages };
      }
    if (Array.isArray(data)) return { items: data, totalPages: 1 };
    return { items: data?.items ?? data?.data ?? data?.list ?? [], totalPages: data?.totalPages ?? data?.pages ?? 1 };
  } catch (err) {
    console.error('[getProductList] ', err);
    throw new Error('상품 목록 조회 중 문제가 발생했습니다.');
  }
}

/* 단건 상품 조회 */

export function getProduct(id) {
  if (!id) {
    return Promise.reject(
      new Error('getProduct: 유효한 상품 ID가 필요합니다.')
    );
  }
  return fetch(`${PRODUCT_BASE}/${id}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`getProduct 실패: ${res.status} ${res.statusText}`);
      }
      return res.json();
    })
    .catch(err => {
      console.error('[getProduct] ', err);
      throw new Error('상품 조회 중 오류가 발생했습니다.');
    });
}

/* 상품 생성 */

export async function createProduct({ name, description, price, tags, images } = {}) {
  if (!name || !description || price == null || !Array.isArray(tags) || !Array.isArray(images)) {
    return Promise.reject(
      new Error('createProduct: name, description, price, tags, images 모두 필수 입력입니다.')
    );
  }
  try {
    const res = await fetch(PRODUCT_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price, tags, images }),
    });
    if (!res.ok) {
      throw new Error(`createProduct 실패: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.error('[createProduct] ', err);
    throw new Error('상품 생성 중 오류가 발생했습니다.');
  }
}

/* 상품 수정 */

export async function patchProduct(id, payload) {
  if (!id) {
    return Promise.reject(new Error('patchProduct: 유효한 상품 ID가 필요합니다.'));
  }
  if (!payload || Object.keys(payload).length === 0) {
    return Promise.reject(new Error('patchProduct: 수정할 내용이 필요합니다.'));
  }
  try {
    const res = await fetch(`${PRODUCT_BASE}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`patchProduct 실패: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.error('[patchProduct] ', err);
    throw new Error('상품 수정 중 오류가 발생했습니다.');
  }
}

/* 상품 삭제 */

export async function deleteProduct(id) {
  if (!id) {
    return Promise.reject(new Error('deleteProduct: 유효한 상품 ID가 필요합니다.'));
  }
  try {
    const res = await fetch(`${PRODUCT_BASE}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(`deleteProduct 실패: ${res.status} ${res.statusText}`);
    }
    return true;
  } catch (err) {
    console.error('[deleteProduct] ', err);
    throw new Error('상품 삭제 중 오류가 발생했습니다.');
  }
}
