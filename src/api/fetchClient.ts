export interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

type FetchResult = Record<string, unknown> | { status: number; ok: boolean };

export const defaultFetch = async <T = unknown>(
  url: string,
  options: FetchOptions = {}
): Promise<T> => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  if (!baseURL) {
    throw new Error("NEXT_PUBLIC_API_URL 환경변수가 설정되지 않았습니다.");
  }

  const finalUrl = url.startsWith("http")
    ? url
    : `${baseURL.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;

  const accessToken = localStorage.getItem("accessToken"); //CORS 문제 해결을 위해 로컬스토리지에서 토큰 가져오기

  const defaultOptions: FetchOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    credentials: "include",
    cache: "no-store",
  };

  const mergedOptions: FetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(finalUrl, mergedOptions);
    console.log("요청 URL:", finalUrl);

    if (!response.ok) {
      // const text = await response.text();
      // console.error(`서버 응답 오류: ${text}`);
      throw new Error(`API error: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return (await response.json()) as T;
    }

    return { status: response.status, ok: response.ok } as unknown as T;
  } catch (error) {
    console.error("네트워크 에러:", error);
    throw error;
  }
};

export const cookieFetch = async <T = unknown>(
  url: string,
  options: FetchOptions = {}
): Promise<T> => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  if (!baseURL) {
    throw new Error("NEXT_PUBLIC_API_URL 환경변수가 설정되지 않았습니다.");
  }

  const defaultOptions: FetchOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store",
  };

  const mergedOptions: FetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
      ...(typeof window !== "undefined" && localStorage.getItem("accessToken")
        ? {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          }
        : {}),
    },
  };

  let response = await fetch(`${baseURL}${url}`, mergedOptions);

  if (response.status === 401 && url !== "/auth/refresh-token") {
    try {
      const refreshResponse = await fetch(`${baseURL}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
        cache: "no-store",
      });

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();

        if (refreshData?.accessToken) {
          localStorage.setItem("accessToken", refreshData.accessToken);
        }

        const retryOptions = {
          ...mergedOptions,
          headers: {
            ...mergedOptions.headers,
            Authorization: `Bearer ${refreshData.accessToken}`,
          },
        };

        response = await fetch(`${baseURL}${url}`, retryOptions);
      }
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
    }
  }

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return (await response.json()) as T;
  }

  return { status: response.status, ok: response.ok } as unknown as T;
};
