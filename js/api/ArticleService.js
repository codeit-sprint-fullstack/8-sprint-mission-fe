import axios from "axios";

const instance = axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app',
});

export async function getArticleList(params = {}) {
  const res = await instance.get('/articles', {
    params,
  });
  return res.data;
}

export async function getArticle(id) {
  const res = await instance.get(`/articles/${id}`);
  return res.data;
}

export async function createArticle(params = {}) {
  const { title, content, image } = params;

  // 유효성 검사 
  if (!title || !content) {
    throw new Error('title이나 content가 유효하지 않습니다.');
  }
  const res = await instance.post('/articles', {
    title,
    content,
    image,
  });

  return res.data;
}

export async function patchArticle(id, params = {}) {
  const { title, content, image } = params;

  if (typeof id !== "number") {
    throw new Error('id가 유효하지 않습니다.');
  }

  const res = await instance.patch(`/articles/${id}`, {
    title,
    content,
    image,
  });

  return res.data;
}

export async function deleteArticle(id) {
  if (typeof id !== "number") {
    throw new Error('id가 유효하지 않습니다.');
  }
  const res = await instance.delete(`/articles/${id}`);
  return res.data;
}