"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DeleteModal from "@/components/Products/DeleteModal";
import { deleteArticle } from "@/api/articles";
import { deleteComment } from "@/api/comments";
import { KebabMenuProps } from "@/types/controller";

const KebabMenu = ({ type, id, onDelete, onEdit }: KebabMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = async () => {
    if (type === "article") {
      router.push(`/articles/${id}/edit`);
    }
    if (type === "comment") {
      onEdit?.();
      // console.log("댓글 수정");
    }
    if (type === "item") {
      router.push(`/items/${id}/edit`);
    }
  };

  const handleDelete = async () => {
    if (type === "article") {
      await deleteArticle(id);
      router.push("/articles");
    }
    if (type === "comment") {
      await deleteComment(id);
      if (onDelete) onDelete(id);
    }
    if (type === "item") {
      setShowDeleteModal(true);
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
        <div className="absolute top-6 right-0 flex flex-col items-start w-[139px] bg-white rounded-lg border border-gray-300">
          <button
            onClick={handleEdit}
            className="flex justify-center items-center self-stretch h-[46px] pt-4 pr-0 pb-3 pl-0 text-base font-normal text-gray-500 cursor-pointer"
          >
            수정하기
          </button>
          <button
            onClick={handleDelete}
            className="flex justify-center items-center self-stretch h-[46px] pt-4 pr-0 pb-3 pl-0 text-base font-normal text-gray-500 cursor-pointer"
          >
            삭제하기
          </button>
        </div>
      )}

      {showDeleteModal && (
        <DeleteModal id={id} onClose={() => setShowDeleteModal(false)} />
      )}
    </div>
  );
};

export default KebabMenu;
