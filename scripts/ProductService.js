export async function getProductList({page = 1, pageSize=10, keyword =''}){
  try{
    const url = new URL( 'https://panda-market-api-crud.vercel.app/products' );
    url.searchParams.append('page',page);
    url.searchParams.append('pageSize',pageSize);
    if(keyword){
        url.searchParams.append('keyword',keyword);
    }
          
    const res = await fetch(url.toString(),{
        method:'GET',
    });

    if(!res.ok){
        console.log('ERROR 발생!');
        throw new Error(`HTTP ERROR! : ${res.status}`);
    }
    return res.json();
    
   }catch(error){
    console.error('getProductList 함수 에러 발생:',error.message);
    return null;
    }
}

export async function getProduct(id) {
  try {
    if (!id) {
      throw new Error('상품 ID를 입력해주세요.');
    }

    const url = `https://panda-market-api-crud.vercel.app/products/${id}`;

    const res = await fetch(url, {
      method: 'GET',
    });

    const contentType = res.headers.get('Content-Type');

    if (!res.ok) {
      throw new Error(`HTTP ERROR! : ${res.status}`);
    }

  } catch (error) {
    console.error('getProduct 함수 에러 발생:', error.message);
    return null;
  }
}

export async function createProduct({ name, description, price, tags, images }) {
  const url = 'https://panda-market-api-crud.vercel.app/products';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, price, tags, images }),
    });

    const contentType = res.headers.get('Content-Type');

    if (!res.ok) {
      throw new Error(`HTTP ERROR! : ${res.status}`);
    }

    if (contentType && contentType.includes('application/json')) {
      const data = await res.json();
      console.log('상품 생성 성공:', data);
      return data;
    } else {
      const text = await res.text();
      console.warn('JSON 형식이 아닌 응답입니다:', text);
      return text;
    }

  } catch (error) {
    console.error('createProduct 함수 에러 발생:', error.message);
    return null;
  }
}

export async function deleteProduct(id) {
  if (!id) {
    throw new Error('상품 ID를 입력해주세요');
  }

  const url = `https://panda-market-api-crud.vercel.app/products/${id}`;

  try {
    const res = await fetch(url, {
      method: 'DELETE',
    });

    const contentType = res.headers.get('Content-Type');

    if (!res.ok) {
      throw new Error(`HTTP ERROR! : ${res.status}`);
    }

    if (contentType && contentType.includes('application/json')) {
      const data = await res.json();
      console.log('상품 삭제 성공:', data);
      return data;
    } else {
      console.warn('JSON 형식이 아닌 응답입니다.');
      return null;
    }

  } catch (error) {
    console.error('deleteProduct 함수 에러 발생:', error.message);
    return null;
  }
}