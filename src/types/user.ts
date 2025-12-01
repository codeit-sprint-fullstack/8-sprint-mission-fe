// 사용자 기본 타입
export interface User {
  id: string;
  email: string;
  nickname?: string;
  [key: string]: unknown;
}

// 사용자 업데이트 데이터
export interface UpdateUserData {
  nickname?: string;
  [key: string]: unknown;
}
