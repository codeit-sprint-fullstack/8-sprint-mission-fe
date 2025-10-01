"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getPostById, updatePost } from "@/lib/posts";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const canSubmit = title.trim() && content.trim();

  useEffect(() => {
    (async () => {
      const data = await getPostById(id);
      if (data) {
        setTitle(data.title ?? "");
        setContent(data.content ?? "");
      }
    })();
  }, [id]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    await updatePost(id, { title: title.trim(), content: content.trim() });
    router.push(`/freeboard/${id}`);
  }

  return (
    <main className="py-6 pb-[794px]">
      <div className="mx-auto w-[1200px] h-[42px] grid grid-cols-[max-content_1034px_max-content] items-center">
        <h1 className="m-0 text-[20px] font-bold leading-[42px]">게시글 수정</h1>
        <div aria-hidden />
        <button
          type="submit"
          form="post-edit-form"
          disabled={!canSubmit}
          className="
            h-[42px] min-w-[74px] px-[23px] py-[12px]
            rounded-[12px]
            text-[#f3f4f6] text-[16px] font-semibold
            bg-[#3692ff] disabled:bg-[#9ca3af]
            disabled:cursor-not-allowed
          "
        >
          수정
        </button>
      </div>

  
      <form id="post-edit-form" onSubmit={onSubmit} className="mx-auto w-[1200px] mt-8">
        <div>
          <div className="text-[16px] font-semibold">*제목</div>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
              mt-3
              w-[1200px] h-[56px]
              rounded-[12px] bg-[#f3f4f6]
              px-6 py-4
              placeholder:text-[#9ca3af] placeholder:text-[16px] placeholder:font-normal
              outline-none
            "
          />
        </div>

        <div className="mt-6">
          <div className="text-[16px] font-semibold">*내용</div>
          <textarea
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="
              mt-3
              w-[1200px] h-[282px]
              rounded-[12px] bg-[#f3f4f6]
              px-6 py-4
              placeholder:text-[#9ca3af] placeholder:text-[16px] placeholder:font-normal
              outline-none resize-none
            "
          />
        </div>
      </form>
    </main>
  );
}
