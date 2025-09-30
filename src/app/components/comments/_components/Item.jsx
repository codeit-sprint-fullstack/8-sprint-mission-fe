"use client";

import React, { useState } from "react";
import ActionDropdown from "@/components/ActionDropdown";
import Button from "../../Button";
import Image from "next/image";

const Item = ({ data, onModify, onDelete }) => {
  const [text, setText] = useState("");
  const [modifyMode, setModifyMode] = useState(false);

  return (
    <div>
      {modifyMode ? (
        <form className="flex flex-col">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-gray-100 p-4 rounded-lg"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setModifyMode(false)}
              className="px-6 py-2 rounded-lg text-white bg-gray-400"
            >
              취소
            </button>
            <Button onClick={() => {onModify(data.id, text)}}>수정완료</Button>
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
      <div className="flex gap-2">
        <Image src={data.profile} alt="writer image" width={40} height={40} />
        <div>
          <div>{data.author}</div>
          <div>{data.createdAt}</div>
        </div>
      </div>
    </div>
  );
};

export default Item;
