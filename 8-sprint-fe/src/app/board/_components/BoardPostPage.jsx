import Button from "@/app/(components)/atoms/Button";
import React from "react";

import ic_plus from "/public/ic_plus.svg";
import Image from "next/image";

const BoardPostPage = () => {
  return (
    <section className="mt-6">
      <form className="flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <p className="text-xl font-bold text-gray-800">게시글 쓰기</p>
          <Button isAble={false}>등록</Button>
        </div>
        <label htmlFor="title" className="mb-3 text-lg font-bold text-gray-900">
          *제목
        </label>
        <input
          type="text"
          name="title"
          placeholder="제목을 입력해주세요"
          className="w-full py-4 px-6 mb-4 bg-gray-100 rounded-xl"
        />
        <label
          htmlFor="content"
          className="mb-3 text-lg font-bold text-gray-900"
        >
          *내용
        </label>
        <textarea
          name="content"
          id="contentArea"
          placeholder="내용을 입력해주세요"
          className="w-full h-70.5 py-4 px-6 mb-4 resize-none bg-gray-100 rounded-xl"
        ></textarea>
        <p className="mb-3 text-lg font-bold text-gray-900">이미지</p>
        <div className="size-70.5 bg-gray-200 rounded-xl flex flex-col gap-3 items-center justify-center">
          <Image src={ic_plus} alt="plus_icon" />
          <p className="text-gray-400">이미지 등록</p>
        </div>
      </form>
    </section>
  );
};

export default BoardPostPage;
