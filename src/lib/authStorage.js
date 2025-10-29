const REFRESH_TOKEN_KEY = 'refreshToken';

// refreshToken 저장
export function saveRefreshToken(refreshToken) {
  if (typeof window === 'undefined') return;
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

// refreshToken만 저장
export function saveTokens({ refreshToken }) {
  saveRefreshToken(refreshToken);
}

// refreshToken 가져오기
export function getRefreshToken() {
  return typeof window !== 'undefined' ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;
}


// 토큰 삭제
export function clearTokens() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}
