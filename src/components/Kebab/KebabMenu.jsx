"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { deleteBoard } from "@/api/boards";
import { updateComment, deleteComment } from "@/api/comments";

const KebabMenu = ({ type, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // React 컴포넌트 안에서 변경 가능한 값을 저장 - 외부 클릭 시 닫기
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = () => {
    if (type === "board") {
      router.push(`/freeboard/${id}/edit`);
    }
    if (type === "comment") {
      // 댓글 수정하기 UI는 뭐지
      console.log("댓글 수정");
      updateComment(id);
    }
  };

  const handleDelete = () => {
    if (type === "board") {
      deleteBoard(id);
    }
    if (type === "comment") {
      deleteComment(id);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <Image
          src="/ic_kebab.svg"
          alt="Kebab icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </button>

      {isOpen && (
        <div className="absolute top-6 right-0 flex flex-col items-start w-[139px] bg-white rounded-lg border border-[#D1D5DB]">
          <button
            onClick={handleEdit}
            className="flex justify-center items-center self-stretch h-[46px] pt-4 pr-0 pb-3 pl-0 text-base font-normal text-[#6B7280] cursor-pointer"
          >
            수정하기
          </button>
          <button
            onClick={handleDelete}
            className="flex justify-center items-center self-stretch h-[46px] pt-4 pr-0 pb-3 pl-0 text-base font-normal text-[#6B7280] cursor-pointer"
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
};

export default KebabMenu;
