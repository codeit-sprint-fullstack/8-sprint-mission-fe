"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import KebabMenu from "../Kebab/KebabMenu";
import { fetchBoard } from "@/api/boards";

const BoardId = () => {
  const { id } = useParams();
  const [board, setBoard] = useState("");

  useEffect(() => {
    const getBoard = async () => {
      try {
        const data = await fetchBoard(id);

        setBoard(data);
      } catch (err) {
        console.error(err);
      }
    };
    getBoard();
  }, [id]);

  if (!board) return null;

  return (
    <div className="flex flex-col items-start self-stretch mb-8">
      <div className="flex flex-col items-start self-stretch mb-6">
        <div className="flex items-start gap-2 self-stretch mb-4">
          <h1 className="w-full text-xl font-bold text-[#1F2937] leading-8">
            {board.title}
          </h1>
          <KebabMenu type="board" id={board.id} />
        </div>

        <div className="flex items-center gap-8 place-self-stretch mb-4 w-full">
          <div className="flex items-center gap-4 text-sm leading-6 mr-4">
            <Image src="/ic_profile.svg" alt="Profile" width={40} height={40} />
            <div className="flex items-start gap-2">
              <p className="font-medium text-[#4B5563]">{board.user_name}</p>
              <p className="font-normal text-[#9CA3AF]">{board.createdAt}</p>
            </div>
          </div>

          <div className="h-[34px] border-l border-gray-200" />

          <button className="flex flex-col gap-[10px] h-10 ml-4 px-3 py-1 bg-white border border-[#E5E7EB] rounded-[35px]">
            <div className="flex items-center gap-1 cursor-pointer">
              <Image src="/ic_heart.svg" alt="Heart" width={32} height={32} />
              <p className="text-base font-medium text-[#6B7280] leading-[26px]">
                {board.heart_count}
              </p>
            </div>
          </button>
        </div>
      </div>

      <hr className="w-full border-t border-gray-200 mb-4" />

      <p className="text-lg font-normal text-[#1F2937] leading-[26px]">
        {board.content}
      </p>
    </div>
  );
};

export default BoardId;
