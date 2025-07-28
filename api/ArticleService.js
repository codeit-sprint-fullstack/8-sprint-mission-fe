import axios from 'axios';

const networkErrorMessage = '네트워크에 접근할 수 없습니다.';

const article = axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app/', 
  timeout: 3000
});

export async function getArticleList( page, pageSize, keyword ) {
  try {
    const res = await article.get('/articles', {
      params: {
        page, 
        pageSize, 
        keyword
      }
    });
    console.log('성공!');
    return res.data;
  } catch(e) {
    console.log('실패');
    if (e.response) {
      return e.response.status;
    } else {
      return networkErrorMessage;
    }
  }
}

export async function getArticle(id) {
  try {
    const res = await article.get(`/articles/${id}`);
    return res.data;
  } catch(e) {
    if (e.response) {
      return e.response.status;
    } else {
      return networkErrorMessage;
    }
  }
}

export async function createArticle( title, content, image ) {
  try {
    const res = await article.post('/articles', {
      params: {
        title, 
        content, 
        image
      }
    });
    return res.data;
  } catch(e) {
    if (e.response) {
      return e.response.status;
    } else {
      return networkErrorMessage;
    }
  }
}

export async function patchArticle(id) {
  try {
    const res = await article.patch(`/articles/${id}`);
    return res.data;
  } catch(e) {
    if (e.response) {
      return e.response.status;
    } else {
      return networkErrorMessage;
    }
  }
}

export async function deleteArticle(id) {
  try {
    const res = await article.delete(`/articles/${id}`);
    return res.data;
  } catch(e) {
    if (e.response) {
      return e.response.status;
    } else {
      return networkErrorMessage;
    }
  }
}
