"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CommunityBoard() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [posts, setPosts] = useState([]);      // 게시글 목록
  const [bestPosts, setBestPosts] = useState([]); // 베스트 게시글
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 게시글 목록 불러오기
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("http://localhost:3000/articles");
        const data = await res.json();

        setPosts(data.data || []);

        // 좋아요 순 정렬해서 베스트 3개 추출 (likes 컬럼 있다고 가정)
        const best = [...(data.data || [])]
          .sort((a, b) => (b.likes || 0) - (a.likes || 0))
          .slice(0, 3);
        setBestPosts(best);
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[1330px]">
        <p>불러오는 중...</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 mt-16 min-h-[1330px]">
      {/* 상단 영역 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-[24px] font-bold text-[#1F2937]">자유게시판</h1>
        <button
          className="flex items-center justify-center h-[42px] px-[20px] rounded-[8px] bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
          onClick={() => router.push("/community/new")}
        >
          글쓰기
        </button>
      </div>

      {/* 베스트 게시글 */}
      <section className="mb-12">
        <h2 className="text-[20px] font-bold text-gray-800 mb-4">베스트 게시글</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {bestPosts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-xl bg-[#F3F4F6] hover:bg-[#E5E7EB] cursor-pointer"
              onClick={() => router.push(`/community/${post.id}`)}
            >
              <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
              <p className="text-sm text-gray-500">❤️ {post.likes || 0}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 검색 & 정렬 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="검색할 상품을 입력해주세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-[300px] h-[42px] px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-[150px] h-[42px] px-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="latest">최신 순</option>
          <option value="popular">좋아요 순</option>
        </select>
      </div>

      {/* 게시글 목록 */}
      <ul className="divide-y divide-gray-200">
        {posts.map((post) => (
          <li
            key={post.id}
            className="py-4 cursor-pointer hover:bg-gray-50 px-2 rounded-lg"
            onClick={() => router.push(`/community/${post.id}`)}
          >
            <h3 className="font-medium text-gray-800">{post.title}</h3>
            <p className="text-sm text-gray-500">{post.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
