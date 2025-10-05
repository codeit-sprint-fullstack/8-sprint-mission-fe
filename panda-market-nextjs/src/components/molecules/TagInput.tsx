"use client";

import React, { useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Text from "@/components/atoms/Text";
import { X } from "lucide-react";

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  maxTags?: number;
  maxTagLength?: number;
  placeholder?: string;
  error?: string;
}

export default function TagInput({
  tags,
  onTagsChange,
  maxTags = 10,
  maxTagLength = 5,
  placeholder = "태그를 입력해주세요",
  error,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  /**
   * 태그 추가 함수
   */
  const addTag = () => {
    const trimmedValue = inputValue.trim();

    // 유효성 검사
    if (!trimmedValue) {
      return;
    }

    if (trimmedValue.length > maxTagLength) {
      alert(`태그는 ${maxTagLength}자 이하로 입력해주세요.`);
      return;
    }

    if (tags.includes(trimmedValue)) {
      alert("이미 존재하는 태그입니다.");
      return;
    }

    if (tags.length >= maxTags) {
      alert(`태그는 최대 ${maxTags}개까지 입력할 수 있습니다.`);
      return;
    }

    onTagsChange([...tags, trimmedValue]);
    setInputValue("");
  };

  /**
   * 태그 삭제 함수
   */
  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    onTagsChange(newTags);
  };

  /**
   * 키보드 이벤트 핸들러
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      addTag();
    } else if (e.key === " " && !e.nativeEvent.isComposing) {
      e.preventDefault();
      addTag();
    }
  };

  /**
   * 입력값 변경 핸들러
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="space-y-4">
      <div>
        <Text styleName="text-lg-semibold" className="text-secondary-800">
          태그
        </Text>
      </div>

      {/* 태그 입력 필드 */}
      <div className="relative">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="bg-secondary-100 py-3 px-6 h-[auto] pr-20"
          maxLength={maxTagLength}
        />
        <Button
          type="button"
          onClick={addTag}
          variant="default"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
          disabled={!inputValue.trim() || tags.length >= maxTags}
        >
          추가
        </Button>
      </div>

      {/* 태그 목록 */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-secondary-100 rounded-full text-sm text-secondary-600 border border-secondary-200"
            >
              <span>#{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-1 text-secondary-400 hover:text-secondary-600 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 에러 메시지 */}
      {error && (
        <Text styleName="text-md-regular" className="text-red-500">
          {error}
        </Text>
      )}
    </div>
  );
}
