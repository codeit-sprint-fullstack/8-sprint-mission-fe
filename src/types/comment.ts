import { User } from './user';

// 댓글 기본 타입
export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: User;
}

// 댓글 생성 데이터
export interface CreateCommentData {
  content: string;
}

// 댓글 수정 데이터
export interface UpdateCommentData {
  content: string;
}

// 댓글 목록 응답
export interface CommentsResponse {
  comments?: Comment[];
  list?: Comment[];
  totalCount?: number;
}

// 댓글 검색 파라미터
export interface CommentParams {
  limit?: number;
  cursor?: number;
}
