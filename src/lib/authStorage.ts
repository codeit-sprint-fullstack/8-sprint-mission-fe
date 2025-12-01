const REFRESH_TOKEN_KEY = 'refreshToken';

// refreshToken 저장
export function saveRefreshToken(refreshToken: string): void {
  if (typeof window === 'undefined') return;
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

// refreshToken만 저장
export function saveTokens({ refreshToken }: { refreshToken: string }): void {
  saveRefreshToken(refreshToken);
}

// refreshToken 가져오기
export function getRefreshToken(): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;
}

// 토큰 삭제
export function clearTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}
