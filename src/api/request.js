export const baseURL = new URL('https://panda-market-api.vercel.app/');

export function requestThen(url, options = {}, errorMsg = "API Error") {
  return fetch(url, options)
    .then((res) => {
      if (!res.ok) throw new Error(errorMsg);
      return res.json();
    })
    .catch((e) => {
      throw new Error(`${errorMsg}: ${e.message}`);
    });
}

export async function requestAwait(url, options = {}, errorMsg = "API Error") {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`${errorMsg}`);
    }

    return await res.json();
  }
  catch (e) {
    throw new Error(`${errorMsg}: ${e.message}`);
  }
}