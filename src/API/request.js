export const baseURL = new URL('https://panda-market-api.vercel.app/');

export async function requestAwait(url, options = {}) {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error("API Error");
    }

    return await res.json();
  }
  catch (e) {
    throw new Error(`API Error: ${e.message}`);
  }
}
