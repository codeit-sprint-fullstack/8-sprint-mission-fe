const BASE_URL = 'https://panda-market-api-crud.vercel.app/articles';


export function getArticleList(page = 1, pageSize= 10, keyword = '') {
  const url = `${BASE_URL}?page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(keyword)}`;

  return fetch(url)
    .then(res => {
      if (!res.ok) {
        console.error('getArticleList 에러:',res.status);
        return;
      }
      return res.json();
    })
    .catch(err => console.error('getArticleList 실패:', err));
}

export function getArticle(id) {
  return fetch(`${BASE_URL}/${id}`)
    .then(res => {
      if (!res.ok) {
        console.error('getArticle 에러:', res.status);
        return;
      }
      return res.json();
    })
    .catch(err => console.error('getArticle 실패:', err));
}

export function createArticle({ title, content, image }) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ title, content, image })
  })
    .then(res => {
      if (!res.ok) {
        console.error('createArticle 에러:', res.status);
        return;
      }
      return res.json();
    })
    .catch(err => console.error('createArticle 실패:', err));
}

export function patchArticle(id, { title, content, image }) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ title, content, image })
  })
    .then(res => {
      if (!res.ok) {
        console.error('patchArticle 에러:', res.status);
        return;
      }
      return res.json();
    })
    .catch(err => console.error('patchArticle 실패:', err));
}

export function deleteArticle(id) {
  return fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
    .then(res => {
      if (!res.ok) {
        console.error('deleteArticle 에러:', res.status);
        return;
      }
      return res.json();
    })
    .catch(err => console.error('deleteArticle 실패:', err))
}