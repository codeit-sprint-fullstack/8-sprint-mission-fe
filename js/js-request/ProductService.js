export async function getProductList(params) {
  const url = new URL('https://panda-market-api-crud.vercel.app/docs/#/Product');
  url.searchParams.append('page');
  url.searchParams.append('pageSize');
  url.searchParams.append('keyword');
  // Object.keys(params).forEach((key) =>
  //   url.searchParams.append(key, params[key])
  // );
  
  const res = await fetch(url);
  const data = await res.json();
  
  return data;
}

export async function getProduct() {
  const res = await fetch('https://panda-market-api-crud.vercel.app/docs/#/Product');
  
  const data = await res.json();
  return data;
}

export async function createProduct() {
  const surveyData = {
    name,
    description,
    price,
    tags,
    image,
  }
  
  const res = await fetch('https://panda-market-api-crud.vercel.app/docs/#/Product', {
    method: 'POST',
    body: JSON.stringify(surveyData),
  });
  
  const data = res.json();
  return data;
}

export async function patchProduct() {
  const res = await fetch('https://panda-market-api-crud.vercel.app/docs/#/Product', {
    method: 'PATCH'
  });
  
  const data = res.json();
  return data;
}

export async function deleteProduct() {
  const res = await fetch('https://panda-market-api-crud.vercel.app/docs/#/Product', {
    method: 'DELETE'
  });
  
  const data = res.json();
  return data;
}