const ARTICLE_BASE = 'https://panda-market-api-crud.vercel.app/articles';

/* 게시글 목록 조회 */

export function getArticleList({ page = 1, pageSize = 10, keyword = '' } = {}) {
  const url = new URL(ARTICLE_BASE);
  url.searchParams.append('page', page);
  url.searchParams.append('pageSize', pageSize);
  if (keyword.trim()) url.searchParams.append('keyword', keyword);

  return fetch(url.toString())
    .then(res => {
      if (!res.ok) throw new Error(`getArticleList 실패: ${res.status} ${res.statusText}`);
      return res.json();
    })
    .catch(err => {
      console.error('[getArticleList]', err);
      throw new Error('글 목록 조회 중 문제가 발생했습니다.');
    });
}

/* 단건 게시글 조회 */

export function getArticle(id) {
  if (!id) {
    return Promise.reject(new Error('getArticle: 유효한 글 ID가 필요합니다.'));
  }
  return fetch(`${ARTICLE_BASE}/${id}`)
    .then(res => {
      if (!res.ok) throw new Error(`getArticle 실패: ${res.status} ${res.statusText}`);
      return res.json();
    })
    .catch(err => {
      console.error('[getArticle]', err);
      throw new Error('글 조회 중 오류가 발생했습니다.');
    });
}

/* 게시글 생성 */

export function createArticle({ title, content, image }) {
  if (!title || !content || !image) {
    return Promise.reject(
      new Error('createArticle: title, content, image 모두 필수 입력입니다.')
      );
  }
  return fetch(ARTICLE_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, image }),
  })
    .then(res => {
      if (!res.ok) throw new Error(`createArticle 실패: ${res.status} ${res.statusText}`);
      return res.json();
    })
    .catch(err => {
      console.error('[createArticle]', err);
      throw new Error('글 생성 중 오류가 발생했습니다.');
    });
}

/* 게시글 수정 */
 
export function patchArticle(id, payload) {
  if (!id) {
    return Promise.reject(new Error('patchArticle: 유효한 글 ID가 필요합니다.'));
  }
  if (!payload || Object.keys(payload).length === 0) {
    return Promise.reject(new Error('patchArticle: 수정할 내용이 필요합니다.'));
  }
  return fetch(`${ARTICLE_BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then(res => {
      if (!res.ok) throw new Error(`patchArticle 실패: ${res.status} ${res.statusText}`);
      return res.json();
    })
    .catch(err => {
      console.error('[patchArticle]', err);
      throw new Error('글 수정 중 오류가 발생했습니다.');
    });
}

/* 게시글 삭제 */

export function deleteArticle(id) {
  if (!id) {
    return Promise.reject(new Error('deleteArticle: 유효한 글 ID가 필요합니다.'));
  }
  return fetch(`${ARTICLE_BASE}/${id}`, {
    method: 'DELETE',
  })
    .then(res => {
      if (!res.ok) throw new Error(`deleteArticle 실패: ${res.status} ${res.statusText}`);
      return true;
    })
    .catch(err => {
      console.error('[deleteArticle]', err);
      throw new Error('글 삭제 중 오류가 발생했습니다.');
    });
}
