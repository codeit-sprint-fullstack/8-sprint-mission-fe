"use client";

import React from "react";
import Image from "next/image";
import type { ItemTagProps } from "@/types/Items";

const ItemTag = ({ tags, removable = false, onRemove }: ItemTagProps) => {
  if (!tags) return null;

  // const tagArray = tags
  //   .split(",")
  //   .map((tag) => tag.trim())
  //   .filter(Boolean);

  let tagArray: string[] = [];

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
          className="relative flex items-center h-9 px-3 gap-1 rounded-3xl border border-gray-200 bg-gray-50"
        >
          <span className="text-base font-normal text-gray-800">#{tag}</span>

          {removable && (
            <button
              type="button"
              onClick={() => onRemove?.(tag)}
              className="flex-shrink-0 p-0 cursor-pointer hover:scale-110 transition-transform"
            >
              <Image src="/ic_X.svg" alt="Remove Icon" width={18} height={18} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemTag;
