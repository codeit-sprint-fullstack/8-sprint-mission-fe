"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { uploadImage } from "@/api/image";

interface ImageFormProps {
  images?: string[];
  onChange?: (urls: string[]) => void;
}

const ImageForm = ({ images = [], onChange }: ImageFormProps) => {
  const [previewImgs, setPreviewImgs] = useState<string[]>([]);

  useEffect(() => {
    if (images?.length) setPreviewImgs(images);
  }, [images]);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;

    const remainCount = 3 - previewImgs.length;
    const selected = files.slice(0, remainCount);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("인증 토큰이 없습니다.");

      const uploadedUrls: string[] = [];
      for (const file of selected) {
        const url = await uploadImage(file, token);
        uploadedUrls.push(url);
      }

      const newImgs = [...previewImgs, ...uploadedUrls].slice(0, 3);
      setPreviewImgs(newImgs);
      onChange?.(newImgs);
    } catch (err) {
      console.error("이미지 업로드 중 오류:", err);
    }
  };

  const handleRemove = (index: number) => {
    const updated = previewImgs.filter((_, i) => i !== index);
    setPreviewImgs(updated);
    onChange?.(updated);
  };

  return (
    <form>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">상품 이미지</h2>

      <div className="flex gap-4 flex-wrap">
        <label className="flex justify-center items-center bg-gray-100 w-[282px] h-[282px] rounded-xl cursor-pointer hover:ring-2 hover:ring-gray-400 transition">
          <div className="flex flex-col items-center">
            <Image src="/ic_plus.svg" alt="추가" width={48} height={48} />
            <p className="text-gray-400">이미지 등록</p>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
          />
        </label>

        {previewImgs.map((url, idx) => (
          <div
            key={idx}
            className="relative w-[282px] h-[282px] bg-gray-100 rounded-xl overflow-hidden"
          >
            <Image
              src={url}
              alt={`상품 이미지 ${idx + 1}`}
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:scale-110 transition-transform"
            >
              <Image src="/ic_X.svg" alt="삭제" width={20} height={20} />
            </button>
          </div>
        ))}
      </div>
    </form>
  );
};

export default ImageForm;
