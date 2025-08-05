const PRODUCT_URL = 'https://panda-market-api-crud.vercel.app/products';

export async function getProductList(page = 1, pageSize = 10, keyword = '') {
  try {
    const res = await fetch(`${PRODUCT_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`);
    if (!res.ok) throw new Error('상품 목록 조회 실패');
    return await res.json();
  } catch (err) {
    console.error(err.message);
  }
}

export async function getProduct(id) {
  try {
    const res = await fetch(`${PRODUCT_URL}/${id}`);
    if (!res.ok) throw new Error('상품 상세 조회 실패');
    return await res.json();
  } catch (err) {
    console.error(err.message);
  }
}

export async function createProduct(data) {
  try {
    const res = await fetch(PRODUCT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('상품 생성 실패');
    return await res.json();
  } catch (err) {
    console.error(err.message);
  }
}

export async function patchProduct(id, data) {
  try {
    const res = await fetch(`${PRODUCT_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('상품 수정 실패');
    return await res.json();
  } catch (err) {
    console.error(err.message);
  }
}

export async function deleteProduct(id) {
  try {
    const res = await fetch(`${PRODUCT_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('상품 삭제 실패');
    return await res.json();
  } catch (err) {
    console.error(err.message);
  }
}
