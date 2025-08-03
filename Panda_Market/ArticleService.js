const ARTICLE_BASE = 'https://panda-market-api-crud.vercel.app/articles';

/* 게시글 목록 조회 */

export function getArticleList(page, pageSize, keyword) {
  const url = new URL(ARTICLE_BASE);
  if (page != null)     url.searchParams.append('page', page);
  if (pageSize != null) url.searchParams.append('pageSize', pageSize);
  if (keyword)          url.searchParams.append('keyword', keyword);

  return fetch(url.toString())
    .then(res => {
      if (!res.ok) throw new Error(`getArticleList 실패: ${res.status} ${res.statusText}`);
      return res.json();
    })
    .then(data => data)
    .catch(err => {
      console.error(err);
      throw err;
    });
}

/* 단건 게시글 조회 */

export function getArticle(id) {
  return fetch(`${ARTICLE_BASE}/${id}`)
    .then(res => {
      if (!res.ok) throw new Error(`getArticle 실패: ${res.status} ${res.statusText}`);
      return res.json();
    })
    .then(data => data)
    .catch(err => {
      console.error(err);
      throw err;
    });
}

/* 게시글 생성 */

export function createArticle({ title, content, image }) {
  return fetch(ARTICLE_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, image }),
  })
    .then(res => {
      if (!res.ok) throw new Error(`createArticle 실패: ${res.status} ${res.statusText}`);
      return res.json();
    })
    .then(data => data)
    .catch(err => {
      console.error(err);
      throw err;
    });
}

/* 게시글 수정 */
 
export function patchArticle(id, payload) {
  return fetch(`${ARTICLE_BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then(res => {
      if (!res.ok) throw new Error(`patchArticle 실패: ${res.status} ${res.statusText}`);
      return res.json();
    })
    .then(data => data)
    .catch(err => {
      console.error(err);
      throw err;
    });
}

/* 게시글 삭제 */

export function deleteArticle(id) {
  return fetch(`${ARTICLE_BASE}/${id}`, {
    method: 'DELETE',
  })
    .then(res => {
      if (!res.ok) throw new Error(`deleteArticle 실패: ${res.status} ${res.statusText}`);
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
}
