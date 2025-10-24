export const defaultFetch = async (url, options = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const accessToken = localStorage.getItem("accessToken"); //CORS 문제 해결을 위해 로컬스토리지에서 토큰 가져오기

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }), //CORS 문제 해결을 위해 토큰 헤더에 추가
    },
    cache: "force-cache",
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(`${baseURL}${url}`, mergedOptions);

  if (!response.ok) {
    const errorData = await response.text();
    console.error(`서버 응답: ${errorData}`);
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

// export const cookieFetch = async (url, options = {}) => {
//   const baseURL = process.env.NEXT_PUBLIC_API_URL;
//   const defaultOptions = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//     cache: "no-store",
//   };

//   const mergedOptions = {
//     ...defaultOptions,
//     ...options,
//     headers: {
//       ...defaultOptions.headers,
//       ...options.headers,
//       ...(typeof window !== "undefined" && localStorage.getItem("accessToken")
//         ? {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           }
//         : {}),
//     },
//   };

//   let response = await fetch(`${baseURL}${url}`, mergedOptions);

//   if (response.status === 401 && url !== "/auth/refresh-token") {
//     try {
//       const refreshResponse = await fetch(`${baseURL}/auth/refresh-token`, {
//         method: "POST",
//         credentials: "include",
//         cache: "no-store",
//       });

//       if (refreshResponse.ok) {
//         const refreshData = await refreshResponse.json();

//         if (refreshData?.accessToken) {
//           localStorage.setItem("accessToken", refreshData.accessToken);
//         }

//         const retryOptions = {
//           ...mergedOptions,
//           headers: {
//             ...mergedOptions.headers,
//             Authorization: `Bearer ${refreshData.accessToken}`,
//           },
//         };

//         response = await fetch(`${baseURL}${url}`, retryOptions);
//       }
//     } catch (error) {
//       console.error("토큰 갱신 실패:", error);
//     }
//   }

//   if (!response.ok) {
//     throw new Error(`API error: ${response.status}`);
//   }

//   const contentType = response.headers.get("content-type");
//   if (contentType && contentType.includes("application/json")) {
//     return response.json();
//   }

//   return { status: response.status, ok: response.ok };
// };
