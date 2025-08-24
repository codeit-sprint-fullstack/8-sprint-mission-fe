export const baseURL = new URL('https://panda-market-api.vercel.app/');

export async function requestAwait(url, options = {}, errorMsg = "API 요청 실패.") {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`${errorMsg} (status: ${res.status})`);
    }

    return await res.json();
  }
  catch (e) {
    throw new Error(`${errorMsg}: ${e.message}`);
  }
}