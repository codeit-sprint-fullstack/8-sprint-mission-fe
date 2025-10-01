import {
  listComments as _listComments,
  createComment as _createComment,
  updateComment as _updateComment,
  deleteComment as _deleteComment,
} from "@/lib/posts";

export function getCommentsByPostId(postId, limit = 10) {
  return _listComments(postId, limit);
}

export function createComment(postId, payload) {
  return _createComment(postId, payload);
}

export function updateComment(postId, commentId, payload) {
  return _updateComment(commentId, payload);
}

export function deleteComment(postId, commentId) {
  return _deleteComment(commentId);
}