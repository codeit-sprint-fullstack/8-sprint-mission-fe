import React from "react";
import Image from "next/image";
import KebabMenu from "../Kebab/KebabMenu";

const Comment = () => {
  return (
    <div className="bg-[#FCFCFC] border-b border-[#E5E7EB]">
      <div className="relative mb-3">
        <div className="flex flex-col font-normal">
          <p className="mb-6 text-sm text-[#1F2937] leading-6">content</p>
          <div className="flex items-start gap-2">
            <Image
              src="/ic_profile.svg"
              alt="Profile"
              width={32}
              height={32}
              className="cursor-pointer"
            />
            <div className="flex flex-col items-start gap-1 text-xs leading-[18px]">
              <p className="text-[#4B5563]">user_name</p>
              <p className="text-[#9CA3AF]">n시간 전</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0">
          <KebabMenu />
          {/* type="comment" id={comment.id} */}
        </div>
      </div>
    </div>
  );
};

export default Comment;
