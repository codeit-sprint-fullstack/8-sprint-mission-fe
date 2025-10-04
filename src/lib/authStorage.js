// Simple token storage helper
export const TOKEN_KEYS = {
  access: 'accessToken',
  refresh: 'refreshToken',
};

export function saveTokens({ accessToken, refreshToken }) {
  if (accessToken) localStorage.setItem(TOKEN_KEYS.access, accessToken);
  if (refreshToken) localStorage.setItem(TOKEN_KEYS.refresh, refreshToken);
}

export function getAccessToken() {
  return typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEYS.access) : null;
}

export function getRefreshToken() {
  return typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEYS.refresh) : null;
}

export function clearTokens() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEYS.access);
  localStorage.removeItem(TOKEN_KEYS.refresh);
}
