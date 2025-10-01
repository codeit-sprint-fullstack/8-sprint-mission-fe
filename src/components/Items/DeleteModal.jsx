"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/api/product";

const DeleteModal = ({ id, onClose }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteProduct(id);

      onClose();
      router.push("items");
    } catch (err) {
      console.error("상품 삭제 실패:", err);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="flex flex-col items-center rounded-xl bg-white p-6 shadow-md w-[298px] h-[198px]">
        <div className="felx flex-col items-center w-full">
          <div className="flex flex-col items-center gap-6 mb-8">
            <Image
              src="/ic_RedCheck.svg"
              alt="Red Check"
              width={24}
              height={24}
            />
            <p className="text-center text-base font-medium text-[#1F2937] leading-[26px]">
              정말로 상품을 삭제하시겠어요?
            </p>
          </div>

          <div className="flex justify-center items-start gap-2">
            <button
              onClick={onClose}
              className="flex justify-center items-center w-[88px] h-[48px] py-3 px-[23px] rounded-lg border border-[#F74747] bg-[#F9FAFB] text-lg font-semibold text-[#F74747] cursor-pointer"
            >
              취소
            </button>
            <button
              onClick={handleDelete}
              className="flex justify-center items-center w-[88px] h-[48px] py-3 px-[23px] rounded-lg bg-[#F74747] text-lg font-semibold text-[#F3F4F6] cursor-pointer"
            >
              네
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
