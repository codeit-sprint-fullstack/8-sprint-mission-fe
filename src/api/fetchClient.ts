import useAuth from '@/store/useAuth';
/**
 * API 요청을 위한 fetch 클라이언트
 */
const baseURL = process.env.NEXT_PUBLIC_API_URL || '';

/* 기본 request 함수 */
async function request<TRes>(
  endpoint: string,
  options: RequestInit = {},
  authRequired: boolean = false
): Promise<TRes> {
  const url = `${baseURL}${endpoint}`;

  // FormData인 경우 Content-Type을 설정하지 않음 (브라우저가 자동으로 설정)
  const isFormData = options.body instanceof FormData;
  const headers = isFormData
    ? { ...options.headers }
    : { 'Content-Type': 'application/json', ...options.headers };

  const config = {
    ...options,
    headers,
  };

  try {
    const { authFetch } = useAuth.getState();
    const response = authRequired ? await authFetch(url, config) : await fetch(url, config);

    if (!response.ok) {
      // 에러 응답 파싱 시도
      const errorData = await response.json().catch(() => null);

      // 다양한 에러 메시지 형식 처리
      let errorMessage = '요청 처리 중 오류가 발생했습니다.';

      if (errorData) {
        errorMessage = errorData.message || errorMessage;
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

/* GET 요청 */
async function get<TRes>(endpoint: string, options: RequestInit = {}) {
  return request<TRes>(endpoint, {
    ...options,
    method: 'GET',
  });
}

async function authGet<TRes>(endpoint: string, options: RequestInit = {}) {
  return request<TRes>(
    endpoint,
    {
      ...options,
      method: 'GET',
    },
    true
  );
}

/* POST 요청 */
async function post<TData, TRes>(endpoint: string, data?: TData, options: RequestInit = {}) {
  // FormData인 경우 JSON.stringify 하지 않음
  const isFormData = data instanceof FormData;

  return request<TRes>(endpoint, {
    ...options,
    method: 'POST',
    body: isFormData ? data : JSON.stringify(data),
  });
}

async function authPost<TData, TRes>(endpoint: string, data?: TData, options: RequestInit = {}) {
  // FormData인 경우 JSON.stringify 하지 않음
  const isFormData = data instanceof FormData;

  return request<TRes>(
    endpoint,
    {
      ...options,
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
    },
    true
  );
}

/* PUT 요청 */
async function put<TData, TRes>(endpoint: string, data?: TData, options: RequestInit = {}) {
  return request<TRes>(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

async function authPut<TData, TRes>(endpoint: string, data?: TData, options: RequestInit = {}) {
  return request<TRes>(
    endpoint,
    {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    },
    true
  );
}

/* DELETE 요청 */
async function deleteFn<TRes>(endpoint: string, options: RequestInit = {}) {
  return request<TRes>(endpoint, {
    ...options,
    method: 'DELETE',
  });
}

async function authDelete<TRes>(endpoint: string, options: RequestInit = {}) {
  return request<TRes>(
    endpoint,
    {
      ...options,
      method: 'DELETE',
    },
    true
  );
}

/* PATCH 요청 */
async function patch<TData, TRes>(endpoint: string, data?: TData, options: RequestInit = {}) {
  return request<TRes>(endpoint, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

async function authPatch<TData, TRes>(endpoint: string, data?: TData, options: RequestInit = {}) {
  return request<TRes>(
    endpoint,
    {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    },
    true
  );
}

export const customFetch = {
  request,
  get,
  post,
  put,
  delete: deleteFn,
  patch,
};

export const customAuthFetch = {
  get: authGet,
  post: authPost,
  put: authPut,
  delete: authDelete,
  patch: authPatch,
};
