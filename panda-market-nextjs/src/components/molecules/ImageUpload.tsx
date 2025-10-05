"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Text from "@/components/atoms/Text";
import { X } from "lucide-react";

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  error?: string;
}

export default function ImageUpload({
  images,
  onImagesChange,
  maxImages = 3,
  error,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  /**
   * 파일 선택 시 호출되는 함수
   */
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    // 최대 이미지 개수 체크
    if (images.length + fileArray.length > maxImages) {
      alert(`최대 ${maxImages}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    setIsUploading(true);

    try {
      const newImageUrls = await Promise.all(
        fileArray.map((file) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              resolve(e.target?.result as string);
            };
            reader.readAsDataURL(file);
          });
        })
      );

      onImagesChange([...images, ...newImageUrls]);
    } catch (error) {
      console.error("이미지 업로드 중 오류가 발생했습니다:", error);
    } finally {
      setIsUploading(false);
      // input 값 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  /**
   * 이미지 삭제
   * @param index 이미지 인덱스
   */
  const handleImageRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  /**
   * 파일 선택 버튼 클릭
   */
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Text styleName="text-lg-semibold" className="text-secondary-800">
          상품 이미지
        </Text>
        <Text styleName="text-md-regular" className="text-secondary-400">
          {images.length}/{maxImages}
        </Text>
      </div>

      {/* 이미지 업로드 영역 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {/* 업로드 버튼 */}
        {images.length < maxImages && (
          <div
            onClick={handleUploadClick}
            className="aspect-square border-2 border-dashed border-secondary-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-secondary-400 transition-colors bg-secondary-50"
          >
            <div className="text-secondary-400 mb-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <Text styleName="text-md-regular" className="text-secondary-400">
              {isUploading ? "업로드 중..." : "이미지 등록"}
            </Text>
          </div>
        )}

        {/* 업로드된 이미지들 */}
        {images.map((image, index) => (
          <div key={index} className="relative aspect-square group">
            <Image
              src={image}
              alt={`상품 이미지 ${index + 1}`}
              fill
              className="object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.src = "/product-list/prod-test.png";
              }}
            />
            <button
              type="button"
              onClick={() => handleImageRemove(index)}
              className="absolute top-2 right-2 w-6 h-6 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      {/* 에러 메시지 */}
      {error && (
        <Text styleName="text-md-regular" className="text-red-500">
          {error}
        </Text>
      )}
    </div>
  );
}
