import axios from 'axios';

const networkErrorMessage = '네트워크에 접근할 수 없습니다.';

const product = axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app/', 
  timeout: 3000
});

export async function getProductList( page, pageSize, keyword ) {
  try {
    const res = await product.get('/products', {
      params: {
        page, 
        pageSize, 
        keyword
      }
    })
    return res.data;
  } catch(e) {
    if (e.response) {
      return e.response.status;
    } else {
      return networkErrorMessage;
    }
  }
}

export async function getProduct(id) {
  try {
    const res = await product.get(`/products/${id}`);
    return res.data;
  } catch(e) {
    if (e.response) {
      return e.response.status;
    } else {
      return networkErrorMessage;
    }
  }
}

export async function createProduct( name, description, price, tags, images ) {
  try {
    const res = await product.post('/products', {
      params: {
        name, 
        description, 
        price, 
        tags, 
        images
      }
    });
  } catch(e) {
    if (e.response) {
      return e.response.status;
    } else {
      return networkErrorMessage;
    }
  }
}

export async function patchProduct(id) {
  try {
    const res = await product.patch(`/products/${id}`);
    return res.data;
  } catch(e) {
    if (e.response) {
      return e.response.status;
    } else {
      return networkErrorMessage;
    }
  }
}

export async function deleteProduct(id) {
  try {
    const res = await product.delete(`/products/${id}`);
    return res.data;
  } catch(e) {
    if (e.response) {
      return e.response.status;
    } else {
      return networkErrorMessage;
    }
  }
}
