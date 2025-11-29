import url from './backendUrl.js';
import useAuth from '@/store/useAuth.js';

async function resErrorCatch(res) {
  if (!res.ok) {
    //404, 500 에러는 리퀘스트 에러가 아니라 리스폰스 에러. fetch는 따로 처리해줘야 합니다.(axois는 같이 담아준다)
    const errorMessage = await res.text();
    throw new Error(`리스폰스 에러: ${res.status} - ${errorMessage}`); //수동으로 에러 던지기
  }
}

export async function getArticles(page = 1, pagesize = 10, orderBy = 'recent', keyword = '') {
  //검색 파라미터를 쿼리로 넘겼습니다.
  const result = await fetch(
    url + `/articles?page=${page}&pageSize=${pagesize}&orderBy=${orderBy}&keyword=${keyword}`
  )
    .then(async (res) => {
      await resErrorCatch(res); //fetch에서 404, 500 리스폰스 에러는 따로 처리
      return res.json(); //중괄호 형식에서는 return 걸어주기
    })
    .catch((err) => console.log(err));
  return result;
}

export async function getArticle(id) {
  const result = await fetch(url + `/articles/${id}`)
    .then(async (res) => {
      await resErrorCatch(res);
      return res.json();
    })
    .catch((err) => console.log(err));
  return result;
}

export async function createArticle(body) {
  const authFetch = useAuth.getState().authFetch;
  const result = await authFetch(`${url}/articles`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(async (res) => {
      await resErrorCatch(res);
      return res.json();
    })
    .catch((err) => console.log(err));
  return result;
}

export async function patchArticle(id, body) {
  const result = await fetch(url + `/articles/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(async (res) => {
      await resErrorCatch(res);
      return res.json();
    })
    .catch((err) => console.log(err));
  return result;
}

export async function deleteArticle(id) {
  const result = await fetch(url + `/articles/${id}`, {
    method: 'DELETE',
  })
    .then(async (res) => {
      await resErrorCatch(res);
      return res.json();
    })
    .catch((err) => console.log(err));
  return result;
}

export async function getComments(id) {
  const result = await fetch(`${url}/articles/${id}/comments`)
    .then(async (res) => {
      await resErrorCatch(res);
      return res.json();
    })
    .catch((err) => console.log(err));
  return result;
}

export async function createComment(id, body) {
  const authFetch = useAuth.getState().authFetch;
  const result = await authFetch(`${url}/articles/${id}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      await resErrorCatch(res);
      return res.json();
    })
    .catch((err) => console.log(err));
  return result;
}

export async function updateComment(id, body) {
  const result = await fetch(`${url}/comments/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      await resErrorCatch(res);
      return res.json();
    })
    .catch((err) => console.log(err));
  return result;
}

export async function deleteComment(id) {
  const result = await fetch(`${url}/comments/${id}`, {
    method: 'DELETE',
  });
  return result;
}
