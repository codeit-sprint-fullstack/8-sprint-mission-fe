import { requestAwait, baseURL } from './request.js';

export async function getProductList({ page, pageSize, orderBy, keyword } = {}) {
  const url = new URL('products', baseURL);
  if (page) url.searchParams.append("page", page);
  if (pageSize) url.searchParams.append("pageSize", pageSize);
  if (orderBy) url.searchParams.append("orderBy", orderBy);
  if (keyword) url.searchParams.append("keyword", keyword);

  return await requestAwait(url, { method: "GET" }, "Failed to get Products");
}

export async function getProduct(productId) {
  if (typeof productId !== "number" || !Number.isFinite(productId)) {
    throw new Error("Invalid product ID");
  }

  const url = new URL(`products/${productId}`, baseURL);

  return await requestAwait(
    url,
    { method: "GET" },
    "Failed to get product"
  );
}

export async function createProduct({ name, description, price, tags = [], images = [] } = {}) {
  if (!name || !description || price == null || !Array.isArray(tags) || !Array.isArray(images)) {
    throw new Error("Invalid product data");
  }

  return await requestAwait(
    new URL('products', baseURL),
    {
      method: 'POST',
      body: JSON.stringify({ name, description, price, tags, images }),
      headers: { "Content-Type": "application/json" },
    },
    "Failed to create product"
  );
}

export async function patchProduct(productId, { name, description, price, tags = [], images = [] } = {}) {
  if (typeof productId !== "number" || !Number.isFinite(productId)) {
    throw new Error("Invalid product ID");
  }

  const url = new URL(`products/${productId}`, baseURL);

  return await requestAwait(
    url,
    {
      method: "PATCH",
      body: JSON.stringify({ name, description, price, tags, images }),
      headers: { "Content-Type": "application/json" },
    },
    "Failed to patch product"
  );
}

export async function deleteProduct(productId) {
  if (typeof productId !== "number" || !Number.isFinite(productId)) {
    throw new Error("Invalid product ID");
  }

  const url = new URL(`products/${productId}`, baseURL);

  return await requestAwait(
    url,
    {
      method: "DELETE",
    },
    "Failed to delete product"
  );
}

