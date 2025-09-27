import KebabMenu from "@/app/(components)/atoms/KebabMenu";
import ProfileIcon from "@/app/(components)/atoms/ProfileIcon";
import React from "react";

const CommentList = ({ content, name, time }) => {
  return (
    <div className="w-full bg-gray-50 border-b border-gray-200 p-3 mb-6">
      <div className="w-full flex items-center justify-between mb-6">
        <p className="text-sm text-gray-800">{content}</p>
        <KebabMenu />
      </div>
      <div className="flex gap-2">
        <ProfileIcon size="32" />
        <div className="flex flex-col gap-1 text-xs">
          <span className="text-gray-600">{name}</span>
          <span className="text-gray-400">{time}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
