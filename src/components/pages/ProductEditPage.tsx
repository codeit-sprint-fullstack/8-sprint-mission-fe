'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button';
import { getProduct, createProduct, updateProduct } from '@/lib/productApi';
import { uploadImages } from '@/lib/uploadApi';
import { useAuth } from '@/providers/AuthProvider';

interface ProductEditPageProps {
  productId?: number;
}

interface FormData {
  name: string;
  description: string;
  price: string;
  tags: string;
  images: string[];
}

const ProductEditPage = ({ productId }: ProductEditPageProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const isEdit = Boolean(productId);
  const [loading, setLoading] = useState(isEdit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: '',
    tags: '',
    images: [],
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      try {
        setLoading(true);
        const productData = await getProduct(productId);

        if (user?.id !== productData.owner?.id) {
          alert('수정 권한이 없습니다.');
          router.push(`/items/${productId}`);
          return;
        }

        setFormData({
          name: productData.name,
          description: productData.description,
          price: productData.price.toString(),
          tags: productData.tags ? productData.tags.join(', ') : '',
          images: productData.images || [],
        });
        setImagePreviews(productData.images || []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (isEdit && productId && user) {
      fetchProduct();
    }
  }, [isEdit, productId, user, router]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const totalImages = imagePreviews.length + files.length;

    if (totalImages > 3) {
      alert('이미지는 최대 3개까지 업로드할 수 있습니다.');
      return;
    }

    const validFiles = files.filter((file) => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name}의 크기가 10MB를 초과합니다.`);
        return false;
      }
      if (!file.type.startsWith('image/')) {
        alert(`${file.name}은(는) 이미지 파일이 아닙니다.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setImageFiles((prev) => [...prev, ...validFiles]);

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreviews((prev) => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));

    const existingImagesCount = formData.images.length;
    if (index >= existingImagesCount) {
      const fileIndex = index - existingImagesCount;
      setImageFiles((prev) => prev.filter((_, i) => i !== fileIndex));
    } else {
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim() || !formData.price) {
      alert('모든 필수 필드를 입력해주세요.');
      return;
    }

    const price = parseInt(formData.price);
    if (isNaN(price) || price < 0) {
      alert('올바른 가격을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      let uploadedImageUrls: string[] = [];
      if (imageFiles.length > 0) {
        const uploadResult = await uploadImages(imageFiles);
        uploadedImageUrls = uploadResult.images || [];
      }

      const allImages = [...formData.images, ...uploadedImageUrls];

      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: price,
        tags: formData.tags
          ? formData.tags
              .split(',')
              .map((tag) => tag.trim())
              .filter((tag) => tag)
          : [],
        images: allImages,
      };

      let result;
      if (isEdit && productId) {
        result = await updateProduct(productId, productData);
        alert('상품이 수정되었습니다.');
      } else {
        result = await createProduct(productData);
        alert('상품이 등록되었습니다.');
      }

      const id = result?.id || productId;
      if (id) {
        router.push(`/items/${id}`);
      } else {
        router.push('/items');
      }
    } catch {
      alert(`상품 ${isEdit ? '수정' : '등록'} 중 오류가 발생했습니다.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <p className="text-red-500">로그인이 필요합니다.</p>
          <Button as={Link} href="/login" className="mt-4" appearance="primary">
            로그인하기
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <p className="text-gray-500">상품 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error && isEdit) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <p className="text-red-500">상품을 불러오는 중 오류가 발생했습니다.</p>
          <p className="text-gray-500 text-sm mt-2">{error}</p>
          <Button as={Link} href={`/items/${productId}`} className="mt-4" appearance="secondary">
            뒤로가기
          </Button>
        </div>
      </div>
    );
  }

  const backUrl = isEdit ? `/items/${productId}` : '/items';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto relative">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">상품 {isEdit ? '수정' : '등록'}</h1>

        <div className="mb-6 absolute top-0 right-0">
          <Button
            as={Link}
            href={backUrl}
            appearance="secondary"
            className="inline-flex items-center gap-2"
          >
            ← 뒤로가기
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">상품 이미지</label>
            <div className="flex gap-4 flex-wrap">
              {imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  className="relative w-40 h-40 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200"
                >
                  <Image
                    src={preview}
                    alt={`상품 이미지 ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-gray-800 bg-opacity-60 hover:bg-opacity-80 rounded-full flex items-center justify-center text-white transition-all"
                    aria-label="이미지 삭제"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {imagePreviews.length < 3 && (
                <label
                  htmlFor="image-upload"
                  className="w-40 h-40 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-all"
                >
                  <div className="text-4xl text-gray-400 mb-2">+</div>
                  <div className="text-sm text-gray-500">이미지 등록</div>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              최대 3개까지 업로드 가능합니다. (각 파일 최대 10MB)
            </p>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              상품명 *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="상품명을 입력해주세요"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              상품 설명 *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="상품에 대한 자세한 설명을 입력해주세요"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              가격 *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="가격을 입력해주세요"
              required
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              태그
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="태그를 쉼표로 구분해서 입력해주세요 (예: 전자제품, 스마트폰, 애플)"
            />
            <p className="text-sm text-gray-500 mt-1">
              쉼표(,)로 구분해서 여러 태그를 입력할 수 있습니다.
            </p>
          </div>

          <div className="flex gap-3 pt-6">
            <Button as={Link} href={backUrl} appearance="secondary" className="flex-1">
              취소
            </Button>
            <Button type="submit" appearance="primary" className="flex-1" disabled={isSubmitting}>
              {isSubmitting
                ? isEdit
                  ? '수정 중...'
                  : '등록 중...'
                : isEdit
                  ? '수정하기'
                  : '등록하기'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditPage;
