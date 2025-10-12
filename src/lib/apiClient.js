import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from './authStorage';
import { refreshAccessToken } from '@/lib/authApi';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://panda-market-api.vercel.app';

export async function apiFetch(
  path,
  { auth = false, headers = {}, parseJson = true, ...rest } = {},
) {
  const token = auth ? getAccessToken() : null;

  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    cache: 'no-store', // 잘못된 'caches' 키 수정 및 최신 데이터 확보
    ...rest,
  };

  let res = await fetch(`${BASE_URL}${path}`, fetchOptions);

  if (res.status === 401 && auth) {
    const refresh = getRefreshToken();
    if (refresh) {
      try {
        const refreshRes = await refreshAccessToken(refresh);
        if (refreshRes?.accessToken) {
          saveTokens({ accessToken: refreshRes.accessToken });
          const retryOptions = {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: `Bearer ${refreshRes.accessToken}`,
            },
          };
          res = await fetch(`${BASE_URL}${path}`, retryOptions);
          // 아래 공통 에러/파싱 로직으로 진행
        }
      } catch (e) {
        clearTokens();
      }
    }
  }

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
