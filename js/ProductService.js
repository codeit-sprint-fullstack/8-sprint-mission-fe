// Product

function checkResponseOk(res) {
  if (!res.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }
}

export async function getProductList(params) {
  const url = new URL(`https://panda-market-api-crud.vercel.app/products`);

  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  const res = await fetch(url);

  checkResponseOk(res);

  const data = await res.json();
  return data;
}

export async function getProduct(id) {
  const res = await fetch(
    `https://panda-market-api-crud.vercel.app/products/${id}`
  );

  checkResponseOk(res);

  const data = await res.json();
  return data;
}

export async function createProduct(productData) {
  const res = await fetch(`https://panda-market-api-crud.vercel.app/products`, {
    method: "POST",
    body: JSON.stringify(productData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  checkResponseOk(res);

  const data = await res.json();
  return data;
}

export async function patchProduct(id, productData) {
  const res = await fetch(
    `https://panda-market-api-crud.vercel.app/products/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(productData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  checkResponseOk(res);

  const data = await res.json();
  return data;
}

export async function deleteProduct(id) {
  const res = await fetch(
    `https://panda-market-api-crud.vercel.app/products/${id}`,
    {
      method: "DELETE",
    }
  );

  checkResponseOk(res);

  const data = await res.json();
  return data;
}
