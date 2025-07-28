export async function getProductList(params = {}) {
  try {
    const url = new URL('https://panda-market-api-crud.vercel.app/docs/#/Product');
    url.searchParams.append('page');
    url.searchParams.append('pageSize');
    url.searchParams.append('keyword');
    // Object.keys(params).forEach((key) =>
    //   url.searchParams.append(key, params[key])
    // );
    const res = await fetch(url);
    if(!res.ok) {
      throw new Error('getProductList 실패');
    }
    
    const data = await res.json();
    
    return data;
  } catch(error) {
    throw error;
  }
}

export async function getProduct(id) {
  try {
    const res = await fetch(`https://panda-market-api-crud.vercel.app/docs/#/Product${id}`);
    
    if(!res.ok) {
      throw new Error('getProduct 실패');
    }

    const data = await res.json();
    return data;
  } catch(error) {
    throw error;
  }
  
}

export async function createProduct() {
  try {
    const productData = {
      name: '이름',
      description: '설명',
      price: 10,
      tags: ['test'],
      image: ['image url'],
    }
    
    const res = await fetch('https://panda-market-api-crud.vercel.app/docs/#/Product', {
      method: 'POST',
      body: JSON.stringify(productData),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    
    if(!res.ok) {
      throw new Error('createProduct 실패');
    }

    const data = res.json();
    return data;
  } catch(error) {
    throw error;
  }
}

export async function patchProduct(id) {
  try {
    const res = await fetch(`https://panda-market-api-crud.vercel.app/docs/#/Product${id}`, {
      method: 'PATCH',
    });
        
    if(!res.ok) {
      throw new Error('patchProduct 실패');
    }

    const data = res.json();
    return data;
  } catch(error) {
    throw error;
  }
    
}

export async function deleteProduct(id) {
  try {
    const res = await fetch(`https://panda-market-api-crud.vercel.app/docs/#/Product${id}`, {
      method: 'DELETE'
    });
    
    if(!res.ok) {
      throw new Error('deleteProduct 실패');
    }

    const data = res.json();
    return data;
  } catch(error) {
    throw error;
  }
}