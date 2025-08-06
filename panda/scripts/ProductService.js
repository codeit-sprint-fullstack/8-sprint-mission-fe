const BASE_URL = 'https://panda-market-api-crud.vercel.app/products';


/**
 * @param {number} page
 * @param {number} pageSize
 * @param {string} keyword
 * @returns {Promise<Object|null>}
 */
export function geProductList(page = 1, pageSize = 10, keyword = '') {
  if (typeof page !== 'number' || typeof pageSize !== 'number' || typeof keyword !== 'string') {
    console.error('getProductList: 유효하지 않은 인자');
    return Promise.resolve(null);
  }

  const params = new URLSearchParams({ page, pageSize, keyword });
  const url = `${BASE_URL}?${params.toString()}`;

  return fetch(url)
    .then(res => {
      if (!res.ok) {
        console.error('getProductList 에러:', res.status);
        return null;
      }
      return res.json();
    })
    .catch(err => {
      console.error('getProductList 실패:', err);
      return null;
    });
}

/**
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export async function getProduct(id) {
  if (!id) {
    console.error('getProduct: 유효하지 않은 id');
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) {
      console.error('getProduct 에러:', res.status);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error('getProduct 실패:', err);
    return null;
  }
}

/**
 * @param {Object} product
 * @param {string} product.name
 * @param {string} product.description
 * @param {number} product.price
 * @param {string[]} product.tags
 * @param {string[]} product.images
 * @returns {Promise<Object|null>}
 */
export async function createProduct({ name, description, price, tags, images }) {
  if (!name || !description || typeof price !== 'number') {
    console.error('createProduct: name, description, price는 필수입니다.');
    return null;
  }

  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price, tags, images })
    });

    if (!res.ok) {
      console.error('createProduct 에러:', res.status);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error('createProduct 실패:', err);
    return null;
  }
}

/**
 * @param {string} id
 * @param {Object} product
 * @param {string} product.name
 * @param {string} product.description
 * @param {number} product.price
 * @param {string[]} product.tags
 * @param {string[]} product.images
 * @returns {Promise<Object|null>}
 */
export async function patchProduct(id, { name, description, price, tags, images }) {
  if (!id || !name || !description || typeof price !== 'number') {
    console.error('patchProduct: id, name, description, price는 필수입니다.');
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price, tags, images })
    });

    if (!res.ok) {
      console.error('patchProduct 에러:', res.status);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error('patchProduct 실패:', err);
    return null;
  }
}

/**
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export async function deleteProduct(id) {
  if (!id) {
    console.error('deleteProduct: 유효하지 않은 id');
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      console.error('deleteProduct 에러:', res.status);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error('deleteProduct 실패:', err);
    return null;
  }
}