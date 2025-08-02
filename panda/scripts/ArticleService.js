const BASE_URL = 'https://panda-market-api-crud.vercel.app/articles';


export async function getArticleList(page = 1, pageSize = 10, keyword = '') {
  try {
    const params = new URLSearchParams({ page, pageSize, keyword });
    const url = `${BASE_URL}?${params.toString()}`;

    const res = await fetch(url);
    if (!res.ok) {
      console.error('getArticleList 에러:', res.status);
      return;
    }
    return await res.json();
  } catch (err) {
    console.error('getArticleList 실패:', err);
  }
}

export async function getArticle(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) {
      console.error('getArticle 에러:', res.status);
      return;
    }
    return await res.json();
  } catch (err) {
    console.error('getArticle 실패:', err);
  }
}

export async function createArticle({ title, content, image }) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, image })
    });
    if (!res.ok) {
      console.error('createArticle 에러:', res.status);
      return;
    }
    return await res.json();
  } catch (err) {
    console.error('createArticle 실패:', err);
  }
}

export async function patchArticle(id, { title, content, image }) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, image })
    });
    if (!res.ok) {
      console.error('patchArticle 에러:', res.status);
      return;
    }
    return await res.json();
  } catch (err) {
    console.error('patchArticle 실패:', err);
  }
}

export async function deleteArticle(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      console.error('deleteArticle 에러:', res.status);
      return;
    }
    return await res.json();
  } catch (err) {
    console.error('deleteArticle 실패:', err);
  }
}