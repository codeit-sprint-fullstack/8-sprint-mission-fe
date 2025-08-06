import axios from "axios"; // HTTP 요청을 쉽게 보낼 수 있는 라이브러리

// 게시글 목록을 가져오는 함수, 다른 파일에서도 사용할 수 있게 export
export function getArticleList(page = 1, pageSize = 10, keyword = "") {
  const apiUrl = "https://panda-market-api-crud.vercel.app/articles"; // API 서버 주소

  // axios.get으로 GET 요청 보내기, params는 쿼리 파라미터로 자동 변환됨
  return axios
    .get(apiUrl, {
      params: {
        page: page,
        pageSize: pageSize,
        keyword: keyword,
      },
    })
    .then((response) => {
      // 요청 성공했을 때 실행, response.data에 실제 데이터가 들어있음
      console.log("받아온 게시글 목록:", response.data);
      return response.data;
    })
    .catch((error) => {
      // 에러 발생했을 때 실행, error.response는 서버 응답 에러
      if (error.response) {
        console.error(
          `Error: ${error.response.status} - ${error.response.statusText}`
        );
      } else {
        // 네트워크 문제 등의 에러
        console.error("Network Error:", error.message);
      }
      throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있게 함
    });
}

// 특정 게시글 하나를 가져오는 함수
export function getArticle(articleId) {
  const url = `https://panda-market-api-crud.vercel.app/articles/${articleId}`;

  return axios
    .get(url)
    .then((response) => {
      console.log("게시글 데이터:", response.data);
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.error(
          `Error: ${error.response.status} - 게시글을 찾을 수 없습니다`
        );
      } else {
        console.error("Network Error:", error.message);
      }
      throw error;
    });
}

// 새로운 게시글을 만드는 함수, POST 요청으로 데이터 전송
export function createArticle(title, content, image) {
  const url = "https://panda-market-api-crud.vercel.app/articles";

  // 서버에 보낼 데이터 객체, 서버가 요구하는 필드들 포함
  const data = {
    title: title,
    content: content,
    image: image,
  };

  // POST 요청으로 새 게시글 생성, 두 번째 파라미터는 요청 바디
  return axios
    .post(url, data)
    .then((response) => {
      console.log("새 게시글 생성됨:", response.data);
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.error(`Error: ${error.response.status} - 게시글 생성 실패`);
      } else {
        console.error("Network Error:", error.message);
      }
      throw error;
    });
}

// 기존 게시글을 수정하는 함수, PATCH 메소드 사용
export function patchArticle(articleId, title, content, image) {
  const url = `https://panda-market-api-crud.vercel.app/articles/${articleId}`;

  // 수정할 데이터만 포함한 객체
  const updateData = {
    title: title,
    content: content,
    image: image,
  };

  // PATCH 요청으로 부분 수정
  return axios
    .patch(url, updateData)
    .then((response) => {
      console.log("게시글 수정 완료:", response.data);
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.error(`Error: ${error.response.status} - 게시글 수정 실패`);
      } else {
        console.error("Network Error:", error.message);
      }
      throw error;
    });
}

// 게시글을 삭제하는 함수, DELETE 메소드 사용
export function deleteArticle(articleId) {
  const url = `https://panda-market-api-crud.vercel.app/articles/${articleId}`;

  // DELETE 요청은 바디 없이 URL의 ID만으로 삭제
  return axios
    .delete(url)
    .then((response) => {
      console.log("게시글 삭제됨:", response.data);
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.error(`Error: ${error.response.status} - 게시글 삭제 실패`);
      } else {
        console.error("Network Error:", error.message);
      }
      throw error;
    });
}
