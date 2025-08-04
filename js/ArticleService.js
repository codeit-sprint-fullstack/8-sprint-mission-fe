// Article

function checkResponseOk(res) {
  if (!res.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }
}

export async function getArticleList({ page, pageSize, keyword }) {
  const url = new URL(`https://panda-market-api-crud.vercel.app/articles`);
  const params = { page, pageSize, keyword };

  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  const res = await fetch(url);

  checkResponseOk(res);

  const data = await res.json();
  return data;
}

export async function getArticle(id) {
  const url = new URL(
    `https://panda-market-api-crud.vercel.app/articles/${id}`
  );

  const res = await fetch(url);

  checkResponseOk(res);

  const data = await res.json();
  return data;
}

export async function createArticle(articleData) {
  const res = await fetch(`https://panda-market-api-crud.vercel.app/articles`, {
    method: "POST",
    body: JSON.stringify(articleData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  checkResponseOk(res);

  const data = await res.json();
  return data;
}

export async function patchArticle(id, articleData) {
  const res = await fetch(
    `https://panda-market-api-crud.vercel.app/articles/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(articleData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  checkResponseOk(res);

  const data = await res.json();
  return data;
}

export async function deleteArticle(id) {
  const res = await fetch(
    `https://panda-market-api-crud.vercel.app/articles/${id}`,
    {
      method: "DELETE",
    }
  );

  checkResponseOk(res);

  const data = await res.json();
  return data;
}
