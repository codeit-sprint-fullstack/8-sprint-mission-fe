const API_URL = "http://localhost:5000/freeboard";
const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}`;
};

// 게시글 목록 조회
export const fetchBoards = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("게시글 목록 가져오기 실패");
  }
  const data = await res.json();

  return data.map((b) => ({
    ...b,
    user_name: "테스트유저",
    heart_count: Math.floor(Math.random() * 100),
    createdAt: formatDate(b.createdAt),
    updatedAt: formatDate(b.updatedAt),
  }));
};

// 게시글 상세 조회
export const fetchBoard = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) {
    throw new Error("게시글 가져오기 실패");
  }
  const data = await res.json();

  return {
    ...data,
    user_name: data.user_name ?? "테스트유저",
    heart_count: data.heart_count ?? Math.floor(Math.random() * 100),
    createdAt: formatDate(data.createdAt),
    updatedAt: formatDate(data.updatedAt),
  };
};

// 게시글 추가
export const addBoard = async ({ title, content }) => {
  const newBoard = {
    title,
    content,
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBoard),
  });

  if (!res.ok) {
    throw new Error("게시글 추가 실패");
  }

  return await res.json();
};

// 게시글 수정
export const updateBoard = async (id, { title, content }) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  if (!res.ok) {
    throw new Error("게시글 수정 실패");
  }
  return await res.json();
};

// 게시글 삭제
export const deleteBoard = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("게시글 삭제 실패");
  }
  return true;
};
