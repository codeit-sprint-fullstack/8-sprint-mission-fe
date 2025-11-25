'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Textarea from '@/components/common/Textarea';
import TagChip from '@/components/common/TagChip';
import { useCreateProduct, useEditProduct } from '@/hooks/mutations/useProductMutations';
import { ProductSchema, productSchema } from '@/schema/productSchema';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getProductById } from '@/services/product.service';

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

const ProductForm = ({ productId = '' }: { productId?: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<ProductSchema>({
    name: '',
    description: '',
    price: 0,
    tags: [],
  });
  const [tagInput, setTagInput] = useState<string>('');
  const [errors, setErrors] = useState<ProductFormErrors>({});

  const { mutate: createProductMutation, isPending: isCreatingProduct } = useCreateProduct();
  const { mutate: editProductMutation, isPending: isEditingProduct } = useEditProduct();

  const isEditMode = !!productId;

  // 폼 검증 로직을 useMemo로 분리 (편집 모드에서는 검증하지 않음)
  const validationErrors = useMemo(() => {
    // 편집 모드일 때는 검증하지 않음
    if (isEditMode) {
      return {};
    }

    const result = productSchema.safeParse(formData);

    if (result.success) {
      return {};
    }

    const newErrors: ProductFormErrors = {};
    result.error.issues.forEach((issue) => {
      const fieldName = issue.path[0] as keyof ProductSchema;
      newErrors[fieldName] = issue.message;
    });

    return newErrors;
  }, [formData, isEditMode]);

  // 공통 input 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: InputValue = e.target.value;
    const name = e.target.name as keyof ProductSchema;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseNumberFromString(String(value)) : value,
    }));
  };

  // 공통 textarea 변경 핸들러
  const handleTextareaChange = (value: string) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  // 태그 입력 변경 핸들러
  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        const res = await getProductById(productId);
        setFormData({
          name: res.data?.name || '',
          description: res.data?.description || '',
          price: res.data?.price || 0,
          tags: res.data?.tags || [],
        });
      };
      fetchProduct();
    }
  }, [productId]);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      e.stopPropagation();
      const trimmedTag = tagInput.trim();
      if (trimmedTag && !formData.tags.includes(trimmedTag)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, trimmedTag],
        }));
        setTagInput('');
      }
    }
  };

  const handleTagDelete = (tagToDelete: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToDelete),
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commonCallbacks = {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        router.replace(isEditMode ? `/products/${productId}` : '/products');
      },
      onError: (error: unknown) => {
        console.log(error);
      },
    };

    if (isEditMode) {
      editProductMutation(
        {
          id: productId,
          name: formData.name,
          price: formData.price,
          description: formData.description,
        },
        commonCallbacks,
      );
    } else {
      createProductMutation(
        {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          tags: formData.tags,
        },
        commonCallbacks,
      );
    }
  };

  // 검증 결과가 변경될 때만 에러 상태 업데이트
  useEffect(() => {
    setErrors(validationErrors);
  }, [validationErrors]);

  return (
    <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
      <div className="flex items-center justify-between">
        <div className="text-secondary-800 text-xl leading-[32px] font-bold">상품 등록하기</div>
        <Button
          type={isEditMode ? 'edit' : 'post'}
          disabled={Object.keys(errors).length > 0 || isCreatingProduct || isEditingProduct}
        />
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
              onChange={handleInputChange}
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
              onChange={handleTextareaChange}
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
              onChange={handleInputChange}
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
                onChange={handleTagChange}
                onKeyDown={isEditMode ? undefined : handleTagKeyDown}
                disabled={isEditMode}
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
                  <TagChip key={tag} type="modify" tag={tag} onClick={() => handleTagDelete(tag)} />
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
