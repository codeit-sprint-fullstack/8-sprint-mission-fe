const PRODUCT_BASE = 'https://panda-market-api-crud.vercel.app/products';

// 상품 목록 조회

export async function getProductList(page, pageSize, keyword) {
  try {
    const url = new URL(PRODUCT_BASE);
    if (page != null)     url.searchParams.append('page', page);
    if (pageSize != null) url.searchParams.append('pageSize', pageSize);
    if (keyword)          url.searchParams.append('keyword', keyword);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`getProductList 실패: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/* 단건 상품 조회 */

export async function getProduct(id) {
  try {
    const res = await fetch(`${PRODUCT_BASE}/${id}`);
    if (!res.ok) throw new Error(`getProduct 실패: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/* 상품 생성 */

export async function createProduct(payload) {
  try {
    const res = await fetch(PRODUCT_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`createProduct 실패: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/* 상품 수정 */

export async function patchProduct(id, payload) {
  try {
    const res = await fetch(`${PRODUCT_BASE}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`patchProduct 실패: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/* 상품 삭제 */

export async function deleteProduct(id) {
  try {
    const res = await fetch(`${PRODUCT_BASE}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`deleteProduct 실패: ${res.status} ${res.statusText}`);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
