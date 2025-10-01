"use client";

import React from "react";
import Image from "next/image";

const ItemTag = ({ tags, removable = false, onRemove }) => {
  if (!tags) return null;

  // const tagArray = tags
  //   .split(",")
  //   .map((tag) => tag.trim())
  //   .filter(Boolean);

  let tagArray = [];

  if (Array.isArray(tags)) {
    tagArray = tags.map((t) => String(t).trim()).filter(Boolean);
  } else if (typeof tags === "string") {
    tagArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  } else {
    tagArray = [String(tags).trim()].filter(Boolean);
  }

  if (tagArray.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tagArray.map((tag, index) => (
        <div
          key={`${tag}-${index}`}
          className="relative flex items-center h-9 px-4 py-1 gap-2 rounded-3xl border border-gray-200 bg-gray-50"
        >
          <span className="text-base font-normal text-gray-800">#{tags}</span>

          {removable && (
            <button
              type="button"
              onClick={() => onRemove?.(tag)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
            >
              <Image src="/ic_X.svg" alt="Remove Icon" width={22} height={24} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemTag;
