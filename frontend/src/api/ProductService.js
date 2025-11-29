import url from './backendUrl.js';
import useAuth from '@/store/useAuth';

//리스폰스 에러만 잡는 코드 (fetch를 써서 필요)
export async function resErrorCatch(res) {
  if (!res.ok) {
    //404, 500 에러는 리퀘스트 에러가 아니라 리스폰스 에러. fetch는 따로 처리해줘야 합니다.(axois는 같이 담아준다)
    const errorMessage = await res.text();
    throw new Error(`리스폰스 에러: ${res.status} - ${errorMessage}`); //수동으로 에러 던지기
  }
}

//상품 목록 조회
export async function getProductList(page = 1, pagesize = 10, orderBy = 'recent', keyword = '') {
  const result = await fetch(
    `${url}/products?page=${page}&pageSize=${pagesize}&orderBy=${orderBy}&keyword=${keyword}`
  )
    .then(async (res) => {
      await resErrorCatch(res); //fetch에서 404, 500 리스폰스 에러는 따로 처리
      return res.json();
    })
    .catch((err) => console.log(err));
  return result; //(코드잇 api 사용시 result.list 경로 사용, 이하 동일)
}

//상품 상세 조회
export async function getProduct(id) {
  const result = await fetch(`${url}/products/${id}`)
    .then(async (res) => {
      await resErrorCatch(res);
      return res.json();
    })
    .catch((err) => console.log(err));
  return result;
}

//상품 등록
export async function createProduct(RqBody) {
  const authFetch = useAuth.getState().authFetch;
  const result = await authFetch(`${url}/products`, {
    method: 'POST',
    body: JSON.stringify(RqBody),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(async (res) => {
      await resErrorCatch(res);
      return res.json();
    })
    .catch((err) => console.log(err));
  return result;
}

//상품 이미지 업로드
export async function uploadImages(formData, productId) {
  const result = await fetch(`${url}/products/${productId}/uploads`, {
    method: 'POST',
    body: formData,
  })
    .then(async (res) => {
      await resErrorCatch(res);
      return res.json();
    })
    .then((data) => {
      console.log('업로드 성공', data);
      return data;
    })
    .catch((err) => console.error('업로드 실패', err));
  return result;
}

//상품 수정
export async function patchProduct(id, RqBody) {
  const result = await fetch(`${url}/products/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(RqBody),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(async (res) => {
      await resErrorCatch(res);
      return res.json();
    })
    .catch((err) => console.log(err));
  return result;
}

//상품 삭제
export async function deleteProduct(id) {
  const result = await fetch(`${url}/products/${id}`, {
    method: 'DELETE',
  })
    .then(async (res) => {
      await resErrorCatch(res);
      return res.json();
    })
    .catch((err) => console.log(err));
  return result;
}

//좋아요
export async function addFavorite(id) {
  const result = await fetch(`${url}/products/${id}/favorite`, {
    method: 'PATCH',
  })
    .then(async (res) => {
      await resErrorCatch(res);
      return res.json();
    })
    .catch((err) => console.log(err));
  return result;
}

/* 상품 문의(댓글) */
export async function getComments(id) {
  const result = await fetch(`${url}/products/${id}/comments`)
    .then(async (res) => {
      await resErrorCatch(res);
      return res.json();
    })
    .catch((err) => console.log(err));
  return result;
}

export async function createComment(id, body) {
  const authFetch = useAuth.getState().authFetch;
  const result = await authFetch(`${url}/products/${id}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      await resErrorCatch(res);
      return res.json();
    })
    .catch((err) => console.log(err));
  return result;
}

export async function updateComment(id, body) {
  const result = await fetch(`${url}/comments/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      await resErrorCatch(res);
      return res.json();
    })
    .catch((err) => console.log(err));
  return result;
}

export async function deleteComment(id) {
  const result = await fetch(`${url}/comments/${id}`, {
    method: 'DELETE',
  });
  return result;
}
