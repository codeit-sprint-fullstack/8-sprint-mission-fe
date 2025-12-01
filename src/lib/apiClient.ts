const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface ApiFetchOptions extends Omit<RequestInit, 'cache'> {
  auth?: boolean;
  parseJson?: boolean;
  cache?: RequestCache;
}

interface ApiError extends Error {
  status?: number;
  details?: unknown;
}

export async function apiFetch<T = unknown>(
  path: string,
  { headers = {}, parseJson = true, cache, ...rest }: ApiFetchOptions = {},
): Promise<T> {
  // FormData의 경우 Content-Type을 자동으로 설정하도록 함
  const isFormData = rest.body instanceof FormData;

  const fetchOptions: RequestInit = {
    headers: isFormData
      ? (headers as HeadersInit) // FormData일 경우 Content-Type 제거 (브라우저가 자동 설정)
      : {
          'Content-Type': 'application/json',
          ...(headers as Record<string, string>),
        },
    credentials: 'include',
    cache: cache || 'no-store',
    ...rest,
  };

  const res = await fetch(`${BASE_URL}${path}`, fetchOptions);

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

    const error = new Error(
      errorBody?.message || `API 요청 실패: ${res.status} ${res.statusText}`,
    ) as ApiError;
    error.status = res.status;
    if (errorBody?.details) error.details = errorBody.details;
    throw error;
  }

  if (!parseJson) return res as T; // 필요 시 원본 Response 반환 옵션

  // 204 No Content 또는 빈 응답 대응
  if (res.status === 204) return null as T;
  const text = await res.text();
  if (!text) return null as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    // JSON 이 아닐 경우 그대로 텍스트 반환 (백엔드 일관성 문제 방어)
    return text as T;
  }
}

// 편의 메서드
export const api = {
  get: <T = unknown>(path: string, opts?: ApiFetchOptions) =>
    apiFetch<T>(path, { method: 'GET', ...opts }),

  post: <T = unknown>(path: string, body: unknown, opts?: ApiFetchOptions) =>
    apiFetch<T>(path, { method: 'POST', body: JSON.stringify(body), ...opts }),

  patch: <T = unknown>(path: string, body: unknown, opts?: ApiFetchOptions) =>
    apiFetch<T>(path, { method: 'PATCH', body: JSON.stringify(body), ...opts }),

  delete: <T = unknown>(path: string, opts?: ApiFetchOptions) =>
    apiFetch<T>(path, { method: 'DELETE', ...opts }),
};
