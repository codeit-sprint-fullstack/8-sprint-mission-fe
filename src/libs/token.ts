export const isBrowser = typeof window !== 'undefined';

export const getAccessToken = () => {
  if (!isBrowser) return null;
  try {
    return window.localStorage.getItem('accessToken');
  } catch {
    return null;
  }
};

export const setAccessToken = (token: string | null) => {
  if (!isBrowser) return;
  try {
    if (token) window.localStorage.setItem('accessToken', token);
    else window.localStorage.removeItem('accessToken');
  } catch {}
};

export const clearAccessToken = () => setAccessToken(null);
