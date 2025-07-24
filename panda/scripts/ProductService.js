const BASE_URL = 'https://panda-market-api-crud.vercel.app/products';


export async function getProductList(page = 1, pageSize = 10, keyword = '') {
  const url = `${BASE_URL}?page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(keyword)}`;

  try {
    const res = await window.axios.get(url);
    return res.data;
  } catch (err) {
    console.error('getProductList 실패:', err);
  }
}

export async function getProduct(id) {
  try {
    const res = await window.axios.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error('getProduct 실패:', err);
  }
}

export async function createProduct({ name, description, price, tags, images }) {
  try {
    const res = await window.axios.post(BASE_URL, {
      name,
      description,
      price,
      tags,
      images,
    });
    return res.data;
  } catch (err) {
    console.error('createProduct 실패:', err);
  }
}

export async function patchProduct(id, {name, description, price, tags, images }) {
  try {
    const res = await window.axios.patch(`${BASE_URL}/${id}`, {
      name,
      description,
      price,
      tags,
      images,
    });
    return res.data;
  } catch (err) {
    console.error('patchProduct 실패:', err);
  }
}

export async function deleteProduct(id) {
  try {
    const res = await window.axios.delete(`${BASE_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error('deleteProduct 실패:', err);
  }
}