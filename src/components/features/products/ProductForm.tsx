'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Textarea from '@/components/common/Textarea';
import TagChip from '@/components/features/products/TagChip';
import { ProductSchema, productSchema } from '@/schema/productSchema';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const inputWrapperClass = 'flex flex-col gap-4';
const inputLabelClass = 'text-secondary-800 text-lg font-bold leading-[26px]';

// 숫자에 콤마 추가하는 함수
const formatNumberWithCommas = (num: number): string => {
  if (num === 0) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 콤마 제거하고 숫자로 변환하는 함수
const parseNumberFromString = (str: string): number => {
  const numStr = str.replace(/,/g, '');
  return numStr === '' ? 0 : Number(numStr) || 0;
};

type InputValue = string | number | string[];
type ProductFormErrors = Partial<Record<keyof ProductSchema, string>>;

const ProductForm = () => {
  const [formData, setFormData] = useState<ProductSchema>({
    name: '',
    description: '',
    price: 0,
    tags: [],
  });
  const [tagInput, setTagInput] = useState<string>('');
  const [errors, setErrors] = useState<ProductFormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: InputValue = e.target.value;
    const name = e.target.name;
    setFormData({
      ...formData,
      [name]: name === 'price' ? parseNumberFromString(String(value)) : value,
    });
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      e.stopPropagation();
      const trimmedTag = tagInput.trim();
      if (trimmedTag && !formData.tags.includes(trimmedTag)) {
        setFormData({
          ...formData,
          tags: [...formData.tags, trimmedTag],
        });
        setTagInput('');
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleTagDelete = (tagToDelete: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToDelete),
    });
  };

  useEffect(() => {
    const result = productSchema.safeParse(formData);

    if (result.success) {
      setErrors({});
      return;
    }

    const newErrors: ProductFormErrors = {};

    result.error.issues.forEach((issue) => {
      const fieldName = issue.path[0] as keyof ProductSchema;

      newErrors[fieldName] = issue.message;
    });

    setErrors(newErrors);
  }, [formData]);

  return (
    <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
      <div className="flex items-center justify-between">
        <div className="text-secondary-800 text-xl leading-[32px] font-bold">상품 등록하기</div>
        <Button type="post" />
      </div>
      <div className="flex flex-col gap-8">
        <div className={inputWrapperClass}>
          <div className={inputLabelClass}>상품 이미지</div>
          <button>
            <Image src="/img_upload.svg" alt="img_upload" width={282} height={282} />
          </button>
        </div>
        <div className={inputWrapperClass}>
          <label className={inputLabelClass}>상품명</label>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="상품명을 입력해주세요"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-error-red pl-4 text-sm leading-[24px] font-semibold">
                {errors.name}
              </p>
            )}
          </div>
        </div>
        <div className={inputWrapperClass}>
          <label className={inputLabelClass}>상품 소개</label>
          <div className="flex flex-col gap-2">
            <Textarea
              type="productDescription"
              size="lg"
              value={formData.description}
              onChange={(value) => setFormData({ ...formData, description: value })}
            />
            {errors.description && formData.description.length > 0 && (
              <p className="text-error-red pl-4 text-sm leading-[24px] font-semibold">
                {errors.description}
              </p>
            )}
          </div>
        </div>
        <div className={inputWrapperClass}>
          <label className={inputLabelClass}>판매가격</label>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="판매 가격을 입력해주세요"
              name="price"
              value={formatNumberWithCommas(formData.price)}
              onChange={handleChange}
            />
            {errors.price && formData.price > 0 && (
              <p className="text-error-red pl-4 text-sm leading-[24px] font-semibold">
                {errors.price}
              </p>
            )}
          </div>
        </div>
        <div className={inputWrapperClass}>
          <label className={inputLabelClass}>태그</label>
          <div className="flex flex-col gap-[14px]">
            <div className="flex flex-col gap-2">
              <Input
                type="text"
                placeholder="태그를 입력해주세요"
                name="tagInput"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
              />
              {errors.tags && (
                <p className="text-error-red pl-4 text-sm leading-[24px] font-semibold">
                  {errors.tags}
                </p>
              )}
            </div>
            {formData.tags.length > 0 && (
              <div className="flex items-center gap-3">
                {formData.tags.map((tag) => (
                  <TagChip key={tag} tag={tag} onClick={() => handleTagDelete(tag)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
