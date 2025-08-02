import axios from "axios";

const networkErrorMessage = "네트워크에 접근할 수 없습니다.";

const article = axios.create({
  baseURL: "https://panda-market-api-crud.vercel.app/",
  timeout: 3000,
});

export async function getArticleList(page, pageSize, keyword) {
  try {
    const response = await article.get("/articles", {
      page,
      pageSize,
      keyword,
    });
    console.log("성공!");
    return response.data;
  } catch (e) {
    console.log("실패");
    if (e.response) {
      return e.response.status;
    } else {
      return networkErrorMessage;
    }
  }
}

export async function getArticle(id) {
  try {
    const response = await article.get(`/articles/${id}`);
    return response.data;
  } catch (e) {
    if (e.response) {
      return e.response.status;
    } else {
      return networkErrorMessage;
    }
  }
}

export async function createArticle(title, content, image) {
  try {
    const response = await article.post("/articles", {
      title,
      content,
      image,
    });
    return response.data;
  } catch (e) {
    if (e.response) {
      return e.response.status;
    } else {
      return networkErrorMessage;
    }
  }
}

export async function patchArticle(id) {
  try {
    const response = await article.patch(`/articles/${id}`);
    return response.data;
  } catch (e) {
    if (e.response) {
      return e.response.status;
    } else {
      return networkErrorMessage;
    }
  }
}

export async function deleteArticle(id) {
  try {
    const response = await article.delete(`/articles/${id}`);
    return response.data;
  } catch (e) {
    if (e.response) {
      return e.response.status;
    } else {
      return networkErrorMessage;
    }
  }
}
