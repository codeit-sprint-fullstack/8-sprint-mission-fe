"use client";

import React, { useState } from "react";
import ActionDropdown from "@/components/ActionDropdown";
import Button from "../../Button";
import Image from "next/image";

const Item = ({ data, onModify, onDelete }) => {
  const [text, setText] = useState("");
  const [modifyMode, setModifyMode] = useState(false);

  return (
    <div className="flex flex-col gap-4 bg-gray-50 p-4 pb-3 border-b border-b-gray-200">
      {modifyMode ? (
        <form className="flex flex-col gap-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-gray-100 p-4 rounded-lg resize-none"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setModifyMode(false)}
              className="px-6 py-2 text-gray-700"
            >
              취소
            </button>
            <Button
              onClick={() => {
                onModify(data.id, text);
              }}
            >
              수정완료
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between">
          <div>{data.content}</div>
          <ActionDropdown
            onModify={() => {
              setText(data.content);
              setModifyMode(true);
            }}
            onDelete={() => onDelete(data.id)}
          />
        </div>
      )}
      <div className="flex gap-2 items-center">
        <Image src={data.profile} alt="writer image" width={40} height={40} />
        <div>
          <div className="text-sm text-gray-500">{data.author}</div>
          <div className="text-xs text-gray-400">
            {data.createdAt.split("T")[0].replace(/-/g, ". ")}
          </div>
        </div>
      </div>
      {/* <hr className="border-t border-gray-200" /> */}
    </div>
  );
};

export default Item;
