const BASE_URL = 'https://panda-market-api-crud.vercel.app/articles';

/**
 * @param {number} page
 * @param {number} pageSize
 * @param {number} pageSize
 * @param {string} keyword
 * @returns {Promise<Object|null>}
*/
export function getArticleList(page = 1, pageSize = 10, keyword = '') {
  if (typeof page !== 'number' || typeof pageSize !== 'number' || typeof keyword !== 'string') {
    console.error('getArticleList: 유효하지 않은 인자');
    return Promise.resolve(null);
  }

  const params = new URLSearchParams({ page, pageSize, keyword });
  const url = `${BASE_URL}?${params.toString()}`;

  return fetch(url)
    .then(res => {
      if (!res.ok) {
        console.error('getArticleList 에러:', res.status);
        return null;
      }
      return res.json();
    })
    .catch(err => {
      console.error('getArticleList 실패:', err);
      return null;
    });
}

/**
 * @param {string} id
 * @returns {Primise<Object|null>}
*/
export async function getArticle(id) {
  if (!id) {
    console.error('getArticle: 유효하지 않은 id');
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) {
      console.error('getArticle 에러:', res.status);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error('getArticle 실패:', err);
    return null;
  }
}

/**
 * @param {Object} article
 * @param {string} article.title
 * @param {string} article.content
 * @param {string} article.image
 * @returns {Promise<Object|null}
*/
export async function createArticle({ title, content, image }) {
  if (!title || !content) {
    console.error('createArticle: title과 content는 필수입니다.');
    return null;
  }

  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, image })
    });

    if (!res.ok) {
      console.error('createArticle 에러:', res.status);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error('createArticle 실패:', err);
    return null;
  }
}

/**
 * @param {string} id
 * @param {Object} article
 * @param {string} article.title
 * @param {string} article.content
 * @param {string} article.image
 * @returns {Promise<Object|null}
*/
export async function patchArticle(id, { title, content, image }) {
  if (!id || !title || !content) {
    console.error('patchArticle: id, title, content는 필수입니다.');
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, image })
    });

    if (!res.ok) {
      console.error('patchArticle 에러:', res.status);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error('patchArticle 실패:', err);
    return null;
  }
}

/**
 * @param {string} id
 * @returns {Promise<Object|null>}
*/
export async function deleteArticle(id) {
  if (!id) {
    console.error('deleteArticle: 유효하지 않은 id');
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      console.error('deleteArticle 에러:', res.status);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error('deleteArticle 실패:', err);
    return null;
  }
}