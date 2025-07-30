
const instance = window.axios.create({
  baseURL: 'https://panda-market-api-crud.vercel.app' ,
});

export async function getArticleList(params = {}) {
  const res = await instance.get('/Articles', {
    params,
  });
  return res.data;
}

export async function getArticle(id) {
  const res = await instance.get(`/Articles/${id}`);
  return res.data;
}

export async function createArticle(params = {}) {
  const res = await instance.post('/Articles', {
    title : params.title,
    content : params.content,
    image : params.image,
  });
  return res.data;
}

export async function patchArticle(id, articleData) {
  const res = await instance.patch(`/Articles/${id}`, articleData);
  return res.data;
}

export async function deleteArticle(id) {
  const res = await instance.delete(`/Articles/${id}`);
  return res.data;
}
