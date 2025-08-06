const BASE_URL = 'https://panda-market-api-crud.vercel.app/products';
// Product API 기본 URL

// **getProductList**: 제품 목록 가져오기 (page, pageSize, keyword 쿼리 파라미터 사용)
export async function getProductList(page = 1, pageSize = 10, keyword = '') {
  try {
    const url = `${BASE_URL}?page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(keyword)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`getProductList 실패: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('getProductList 오류:', err.message);
    throw err; // 호출한 쪽으로 오류 전달
  }
}

// **getProduct**: 특정 제품(id) 상세 정보 가져오기
export async function getProduct(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error(`getProduct 실패: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('getProduct 오류:', err.message);
    throw err;
  }
}

// **createProduct**: 제품 생성 (name, description, price, tags, images 필요)
export async function createProduct(name, description, price, tags = [], images = []) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, description, price, tags, images })
    });
    if (!res.ok) throw new Error(`createProduct 실패: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('createProduct 오류:', err.message);
    throw err;
  }
}

// **patchProduct**: 특정 제품 정보 수정 (id와 수정할 데이터 전달)
export async function patchProduct(id, data) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`patchProduct 실패: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('patchProduct 오류:', err.message);
    throw err;
  }
}

// **deleteProduct**: 특정 제품 삭제
export async function deleteProduct(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`deleteProduct 실패: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('deleteProduct 오류:', err.message);
    throw err;
  }
}
