import ActionDropdown from "@/components/ActionDropdown";
import Image from "next/image";
import React from "react";

const BoardDetail = ({ data }) => {
  return (
    <div>
      <div className="flex justify-between">
        <div>{data.title}</div>
        <ActionDropdown />
      </div>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4">
          <div>
            <Image
              src={data.profile}
              alt="writer image"
              width={40}
              height={40}
            />
          </div>
          <div className="flex items-center gap-2">
            <div>{data.author}</div>
            <div>{data.createdAt}</div>
          </div>
        </div>
        <div className="w-px h-6 bg-gray-200"></div>
        <div>{data.likes}</div>
      </div>
      <hr className="border-t border-gray-200" />
      <div>{data.content}</div>
    </div>
  );
};

export default BoardDetail;
