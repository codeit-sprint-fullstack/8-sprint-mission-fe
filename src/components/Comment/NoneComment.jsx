import React from "react";
import Image from "next/image";

const NoneComment = () => {
  return (
    <div className="flex flex-col items-center self-stretch w-full">
      <div className="flex flex-col justify-center items-center gap-4">
        <Image
          src="/empty_comment.svg"
          alt="Empty Comment"
          width={140}
          height={140}
        />
        <p className="self-stretch text-base font-normal text-[#9CA3AF] leading-[26px]">
          아직 댓글이 없어요, <br />
          지금 댓글을 달아보세요!
        </p>
      </div>
    </div>
  );
};

export default NoneComment;
