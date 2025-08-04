// Product
export async function getProductList(params) {
  const url = new URL(`https://panda-market-api-crud.vercel.app/products`);

  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }

  const data = await res.json();
  return data;
}

export async function getProduct(id) {
  const res = await fetch(
    `https://panda-market-api-crud.vercel.app/products/${id}`
  );

  if (!res.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }

  const data = await res.json();
  return data;
}

export async function createProduct(createProductBody) {
  const res = await fetch(`https://panda-market-api-crud.vercel.app/products`, {
    method: "POST",
    body: JSON.stringify(createProductBody),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }

  const data = await res.json();
  return data;
}

export async function patchProduct(patchId, patchProductBody) {
  const res = await fetch(
    `https://panda-market-api-crud.vercel.app/products/${patchId}`,
    {
      method: "PATCH",
      body: JSON.stringify(patchProductBody),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }

  const data = await res.json();
  return data;
}

export async function deleteProduct(deleteId) {
  const res = await fetch(
    `https://panda-market-api-crud.vercel.app/products/${deleteId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }

  const data = await res.json();
  return data;
}
