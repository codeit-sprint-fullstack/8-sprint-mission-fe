const BASE_URL = 'https://panda-market-api-crud.vercel.app/articles';

// [GET] 전체 글 조회
export function getArticleList(page = 1, pageSize = 10, keyword = '') {
  return fetch(`${BASE_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
    .then((res) => {
      if (!res.ok) throw new Error('게시글 목록 조회 실패');
      return res.json();
    })
    .catch((err) => console.error(err.message));
}

// [GET] 특정 글 조회
export function getArticle(id) {
  return fetch(`${BASE_URL}/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error('게시글 상세 조회 실패');
      return res.json();
    })
    .catch((err) => console.error(err.message));
}

// [POST] 글 생성
export function createArticle(data) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) throw new Error('게시글 생성 실패');
      return res.json();
    })
    .catch((err) => console.error(err.message));
}

// [PATCH] 글 수정
export function patchArticle(id, data) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) throw new Error('게시글 수정 실패');
      return res.json();
    })
    .catch((err) => console.error(err.message));
}

// [DELETE] 글 삭제
export function deleteArticle(id) {
  return fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
    .then((res) => {
      if (!res.ok) throw new Error('게시글 삭제 실패');
      return res.json();
    })
    .catch((err) => console.error(err.message));
}
