import { getRefreshToken, clearTokens } from './authStorage';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function apiFetch(
  path,
  { auth = false, headers = {}, parseJson = true, ...rest } = {},
) {
  // FormData의 경우 Content-Type을 자동으로 설정하도록 함
  const isFormData = rest.body instanceof FormData;
  
  const fetchOptions = {
    headers: isFormData
      ? headers // FormData일 경우 Content-Type 제거 (브라우저가 자동 설정)
      : {
          'Content-Type': 'application/json',
          ...headers,
        },
    credentials: 'include',
    cache: 'no-store',
    ...rest,
  };

  let res = await fetch(`${BASE_URL}${path}`, fetchOptions);

  if (!res.ok) {
    // 에러 응답 바디 파싱 시도 (JSON 우선)
    let errorBody = null;
    try {
      const text = await res.text();
      if (text) {
        try {
          errorBody = JSON.parse(text);
        } catch {
          errorBody = { message: text };
        }
      }
    } catch {
      // 무시: 바디 읽기 실패
    }

    const error = new Error(errorBody?.message || `API 요청 실패: ${res.status} ${res.statusText}`);
    error.status = res.status;
    if (errorBody?.details) error.details = errorBody.details;
    throw error;
  }

  if (!parseJson) return res; // 필요 시 원본 Response 반환 옵션

  // 204 No Content 또는 빈 응답 대응
  if (res.status === 204) return null;
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (e) {
    // JSON 이 아닐 경우 그대로 텍스트 반환 (백엔드 일관성 문제 방어)
    return text;
  }
}

// 편의 메서드
export const api = {
  get: (path, opts) => apiFetch(path, { method: 'GET', ...opts }),

  post: (path, body, opts) =>
    apiFetch(path, { method: 'POST', body: JSON.stringify(body), ...opts }),

  patch: (path, body, opts) =>
    apiFetch(path, { method: 'PATCH', body: JSON.stringify(body), ...opts }),

  delete: (path, opts) => apiFetch(path, { method: 'DELETE', ...opts }),
};
