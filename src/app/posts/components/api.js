const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

const jsonHeaders = {
    "Content-Type": "application/json",
};

const formatDate = (dateStr) => {
    try {
        const d = new Date(dateStr);
        if (Number.isNaN(d.getTime())) return String(dateStr || "");
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const hh = String(d.getHours()).padStart(2, "0");
        const mm = String(d.getMinutes()).padStart(2, "0");
        return `${y}. ${m}. ${day} ${hh}:${mm}`;
    } catch {
        return String(dateStr || "");
    }
};

// 게시글 상세 + 댓글 목록 조회
export const getPostAndCommentsAPI = async (postId) => {
    const [postRes, commentsRes] = await Promise.all([
        fetch(`${API_BASE}/posts/${postId}`, { cache: "no-store" }),
        fetch(`${API_BASE}/comments/posts/${postId}?limit=50`, {
            cache: "no-store",
        }),
    ]);
    if (!postRes.ok) throw new Error("게시글 조회 실패");
    if (!commentsRes.ok) throw new Error("댓글 조회 실패");
    const post = await postRes.json();
    const { items: commentItems = [] } = await commentsRes.json();

    return {
        post: {
            id: post.id,
            title: post.title,
            content: post.content,
            createdAt: formatDate(post.createdAt),
            author: post.author || "익명", // 기본값 설정
            likes: post.likes ?? 0,
        },
        comments: commentItems.map((c) => ({
            id: c.id,
            content: c.content,
            createdAt: formatDate(c.createdAt),
            author: c.author || "익명",
        })),
    };
};

export const deletePostAPI = async (postId) => {
    const res = await fetch(`${API_BASE}/posts/${postId}`, {
        method: "DELETE",
    });
    if (!res.ok && res.status !== 204) throw new Error("게시글 삭제 실패");
};

export const createCommentAPI = async (postId, commentData) => {
    const res = await fetch(`${API_BASE}/comments/posts/${postId}`, {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify({ content: commentData.content }),
    });
    if (!res.ok) throw new Error("댓글 생성 실패");
    const created = await res.json();
    return {
        id: created.id,
        content: created.content,
        createdAt: formatDate(created.createdAt),
        author: "익명",
    };
};

export const updateCommentAPI = async (commentId, commentData) => {
    const res = await fetch(`${API_BASE}/comments/${commentId}`, {
        method: "PATCH",
        headers: jsonHeaders,
        body: JSON.stringify({ content: commentData.content }),
    });
    if (!res.ok) throw new Error("댓글 수정 실패");
    const updated = await res.json();
    return {
        id: updated.id,
        content: updated.content,
        createdAt: formatDate(updated.createdAt),
        author: "익명",
    };
};

export const deleteCommentAPI = async (commentId) => {
    const res = await fetch(`${API_BASE}/comments/${commentId}`, {
        method: "DELETE",
    });
    if (!res.ok && res.status !== 204) throw new Error("댓글 삭제 실패");
};

// 게시글 등록
export const createPostAPI = async ({ title, content }) => {
    const res = await fetch(`${API_BASE}/posts`, {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify({ title, content }),
    });
    if (!res.ok) throw new Error("게시글 생성 실패");
    const created = await res.json();
    return created; // { id, title, content, createdAt, updatedAt }
};

// 게시글 수정
export const updatePostAPI = async (postId, { title, content }) => {
    const payload = {};
    if (title !== undefined) payload.title = title;
    if (content !== undefined) payload.content = content;
    const res = await fetch(`${API_BASE}/posts/${postId}`, {
        method: "PATCH",
        headers: jsonHeaders,
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("게시글 수정 실패");
    const updated = await res.json();
    return updated; // { id, title, content, createdAt, updatedAt }
};

// 게시글 단건 조회 (수정 폼용)
export const getPostDetailsAPI = async (postId) => {
    const res = await fetch(`${API_BASE}/posts/${postId}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("게시글 상세 조회 실패");
    const post = await res.json();
    return post; // { id, title, content, createdAt, updatedAt }
};
