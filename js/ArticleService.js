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

export async function getArticle(getId) {
  const url = new URL(
    `https://panda-market-api-crud.vercel.app/articles/${getId}`
  );

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }

  const data = await res.json();
  return data;
}

export async function createArticle(createArticleBody) {
  const res = await fetch(`https://panda-market-api-crud.vercel.app/articles`, {
    method: "POST",
    body: JSON.stringify(createArticleBody),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }

  const data = await res.json();
  return data;
}

export async function patchArticle(patchId, patchArticleBody) {
  const res = await fetch(
    `https://panda-market-api-crud.vercel.app/articles/${patchId}`,
    {
      method: "PATCH",
      body: JSON.stringify(patchArticleBody),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }

  const data = await res.json();
  return data;
}

export async function deleteArticle() {}
