import Button from "@/app/components/Button";
import React from "react";

const BoardForm = () => {
  return (
    <form className="flex flex-col gap-6 my-6">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">게시글 쓰기</div>
        <Button>등록</Button>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-lg font-bold">제목</div>
        <input
          placeholder="제목을 입력해주세요"
          className="bg-gray-100 p-4 rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-lg font-bold">내용</div>
        <textarea
          placeholder="내용을 입력해주세요"
          className="bg-gray-100 resize-none p-4 rounded-lg min-h-80"
        />
      </div>
    </form>
  );
};

export default BoardForm;
