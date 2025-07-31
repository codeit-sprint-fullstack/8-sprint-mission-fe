const BASE_URL = 'https://panda-market-api-crud.vercel.app/articles';  
// Article API의 기본 URL

// **getArticleList**: 전체 글 목록 가져오기 (page, pageSize, keyword로 검색)
export function getArticleList(page = 1, pageSize = 10, keyword = '') {
  const url = `${BASE_URL}?page=${page}&pageSize=${pageSize}&keyword=${encodeURIComponent(keyword)}`;
  return fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`getArticleList 실패: ${res.status}`); // 응답이 실패하면 오류 발생
      return res.json(); // 성공하면 JSON 데이터 반환
    })
    .catch(err => {
      console.error('getArticleList 오류:', err.message);
      throw err; // 호출한 곳으로 오류 전달
    });
}

// **getArticle**: 특정 ID의 글 하나 가져오기
export function getArticle(id) {
  return fetch(`${BASE_URL}/${id}`)
    .then(res => {
      if (!res.ok) throw new Error(`getArticle 실패: ${res.status}`);
      return res.json();
    })
    .catch(err => {
      console.error('getArticle 오류:', err.message);
      throw err;
    });
}

// **createArticle**: 새 글 생성 (title, content, image 포함)
export function createArticle(title, content, image) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title, content, image}) // 서버에 보낼 데이터
  })
  .then(res => {
    if (!res.ok) throw new Error(`createArticle 실패: ${res.status}`);
    return res.json();
  })
  .catch(err => {
    console.error('createArticle 오류:', err.message);
    throw err;
  });
}

// **patchArticle**: 특정 글 수정 (id로 지정, 수정할 데이터 전달)
export function patchArticle(id, data) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  .then(res => {
    if (!res.ok) throw new Error(`patchArticle 실패: ${res.status}`);
    return res.json();
  })
  .catch(err => {
    console.error('patchArticle 오류:', err.message);
    throw err;
  });
}

// **deleteArticle**: 특정 글 삭제 (id로 지정)
export function deleteArticle(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  })
  .then(res => {
    if (!res.ok) throw new Error(`deleteArticle 실패: ${res.status}`);
    return res.json();
  })
  .catch(err => {
    console.error('deleteArticle 오류:', err.message);
    throw err;
  });
}
