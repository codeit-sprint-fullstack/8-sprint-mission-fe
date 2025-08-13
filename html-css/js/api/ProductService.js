import { instance } from "./main.js";

export async function getProductList(params = {}) {
  const res = await instance.get('/products', {
    params,
  });
  return res.data;
}

export async function getProduct(id) {
  const res = await instance.get(`/products/${id}`);
  return res.data;
}

export async function createProduct(params = {}) {
  const {
    name,
    description,
    price,
    tags = [],
    images = []
  } = params;

  // 유효성 검사 
  if (!name || !description || !price ) {
    throw new Error('입력된 값이 유효하지 않습니다. 제품명, 제품 설명, 가격을 필수로 올려주세요.');
  }
  const res = await instance.post('/products', {
    name,
    description,
    price,
    tags,
    images,
  });

  return res.data;
}

export async function patchProduct(id, params = {}) {
  const { name, description, price, tags, images } = params;

  if (typeof id !== "number") {
    throw new Error('id가 유효하지 않습니다.');
  }

  const res = await instance.patch(`/products/${id}`, {
    name,
    description,
    price,
    tags,
    images,
  });

  return res.data;
}

export async function deleteProduct(id) {
  if (typeof id !== "number") {
    throw new Error('id가 유효하지 않습니다.');
  }
  const res = await instance.delete(`/products/${id}`);
  return res.data;
}