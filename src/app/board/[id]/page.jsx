"use client";

import { useParams, useRouter } from "next/navigation";

export default function BoardDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  return (
    <div className="px-[22.5rem] py-8">
      <h1 className="text-xl font-semibold mb-4">게시글 상세</h1>

      {/* TODO: 실제 상세 데이터 렌더링 */}
      <p className="mb-6">게시글 ID: {id}</p>

      <button
        onClick={() => router.push(`/board/${id}/edit`)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        수정하기
      </button>
    </div>
  );
}
