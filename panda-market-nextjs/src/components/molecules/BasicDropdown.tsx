import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

interface BasicDropdownProps {
  id: string;
  onDelete: () => void;
  onUpdate: () => void;
}

export default function BasicDropdown({
  id,
  onDelete,
  onUpdate,
}: BasicDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src="/article/kebab.svg"
          alt="kebab"
          width={24}
          height={24}
          style={{ width: "24", height: "24", cursor: "pointer" }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-center shadow-none" align="end">
        <button
          onClick={onUpdate}
          className="block w-full py-2 hover:bg-gray-100 cursor-pointer"
        >
          수정하기
        </button>
        <button
          onClick={onDelete}
          className="block w-full py-2 hover:bg-gray-100 cursor-pointer"
        >
          삭제하기
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
