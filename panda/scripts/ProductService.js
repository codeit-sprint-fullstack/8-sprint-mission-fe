const BASE_URL = 'https://panda-market-api-crud.vercel.app/products';


export async function getProductList(page = 1, pageSize = 10, keyword = '') {
  try {
    const params = new URLSearchParams({ page, pageSize, keyword });
    const url = `${BASE_URL}?${params.toString()}`;

    const res = await fetch(url);
    if (!res.ok) {
      console.error('getProductList 에러:', res.status);
      return;
    }
    return await res.json();
  } catch (err) {
    console.error('getProductList 실패:', err);
  }
}

export async function getProduct(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) {
      console.error('getProduct 에러:', res.status);
      return;
    }
    return await res.json();
  } catch (err) {
    console.error('getProduct 실패:', err);
  }
}

export async function createProduct({ name, description, price, tags, images }) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price, tags, images })
    });
    if (!res.ok) {
      console.error('createProduct 에러:', res.status);
      return;
    }
    return await res.json();
  } catch (err) {
    console.error('createProduct 실패:', err);
  }
}

export async function patchProduct(id, {name, description, price, tags, images }) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price, tags, images })
    });
    if (!res.ok) {
      console.error('patchProduct 에러:', res.status);
      return;
    }
    return await res.json();
  } catch (err) {
    console.error('patchProduct 실패:', err);
  }
}

export async function deleteProduct(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      console.error('deleteProduct 에러:', res.status);
      return;
    }
    return await res.json();
  } catch (err) {
    console.error('deleteProduct 실패:', err);
  }
}