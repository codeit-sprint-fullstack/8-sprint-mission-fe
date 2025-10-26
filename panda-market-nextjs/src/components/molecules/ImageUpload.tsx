"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Text from "@/components/atoms/Text";
import { X, Loader2 } from "lucide-react";
import { useUploadQuery } from "@/lib/api/upload/queries";

interface ImageUploadProps {
  images: Array<{ image: { url: string } }>;
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  error?: string;
  label?: string;
}

export default function ImageUpload({
  images,
  onImagesChange,
  maxImages = 3,
  error,
  label = "상품 이미지",
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");

  const { mutate: uploadImagesMutation } = useUploadQuery.useUploadImages();

  /**
   * 파일 선택 시 호출되는 함수
   */
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    // 최대 이미지 개수 체크
    if (images.length + fileArray.length > maxImages) {
      setUploadError(`최대 ${maxImages}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    // 파일 크기 체크 (10MB)
    const maxSize = 10 * 1024 * 1024;
    const oversizedFiles = fileArray.filter((file) => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      setUploadError("파일 크기는 10MB 이하여야 합니다.");
      return;
    }

    // 이미지 파일 형식 체크
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    const invalidFiles = fileArray.filter(
      (file) => !validTypes.includes(file.type)
    );
    if (invalidFiles.length > 0) {
      setUploadError(
        "JPG, PNG, GIF, WEBP 형식의 이미지만 업로드할 수 있습니다."
      );
      return;
    }

    setIsUploading(true);
    setUploadError("");

    uploadImagesMutation(fileArray, {
      onSuccess: (uploadedImages) => {
        const newImageUrls = uploadedImages.map((img) => img.url);
        onImagesChange([...images, ...newImageUrls] as string[]);
        setIsUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
      onError: (error) => {
        console.error("이미지 업로드 중 오류가 발생했습니다:", error);
        setUploadError(
          error instanceof Error
            ? error.message
            : "이미지 업로드 중 오류가 발생했습니다."
        );
        setIsUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
    });
  };

  /**
   * 이미지 삭제
   * @param index 이미지 인덱스
   */
  const handleImageRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages.map((img) => img.image?.url));
  };

  /**
   * 파일 선택 버튼 클릭
   */
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div>
        <Text styleName="text-lg-semibold" className="text-secondary-800">
          {label}
        </Text>
      </div>

      {/* 이미지 업로드 영역 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {/* 업로드 버튼 */}
        {images.length < maxImages && (
          <div
            onClick={isUploading ? undefined : handleUploadClick}
            className={`aspect-square border-secondary-300 rounded-lg flex flex-col items-center justify-center transition-colors bg-secondary-50 ${
              isUploading
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:border-secondary-400"
            }`}
          >
            <div className="text-secondary-400 mb-2">
              {isUploading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
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
              )}
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
              src={image.image?.url}
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
      {(error || uploadError) && (
        <Text styleName="text-md-regular" className="text-red-500">
          {error || uploadError}
        </Text>
      )}
    </div>
  );
}
