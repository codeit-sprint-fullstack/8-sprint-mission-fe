// Article

export async function getArticleList({ page, pageSize, keyword }) {
  const url = new URL(`https://panda-market-api-crud.vercel.app/articles`);
  const params = { page, pageSize, keyword };

  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }

  const data = await res.json();
  return data;
}

export async function getArticle() {}

export async function createArticle() {}

export async function patchArticle() {}

export async function deleteArticle() {}
