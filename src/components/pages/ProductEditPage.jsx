'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import { getProduct, updateProduct } from '@/lib/productApi';
import { useAuth } from '@/providers/AuthProvider';

const ProductEditPage = ({ productId }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    tags: '',
    images: [],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await getProduct(productId);

        // 소유자 확인
        if (user?.id !== productData.ownerId) {
          alert('수정 권한이 없습니다.');
          router.push(`/items/${productId}`);
          return;
        }

        setProduct(productData);
        setFormData({
          name: productData.name,
          description: productData.description,
          price: productData.price.toString(),
          tags: productData.tags ? productData.tags.join(', ') : '',
          images: productData.images || [],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId && user) {
      fetchProduct();
    }
  }, [productId, user, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
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
      const updateData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: price,
        tags: formData.tags
          ? formData.tags
              .split(',')
              .map((tag) => tag.trim())
              .filter((tag) => tag)
          : [],
        images: formData.images,
      };

      await updateProduct(productId, updateData);
      alert('상품이 수정되었습니다.');
      router.push(`/items/${productId}`);
    } catch (err) {
      alert('상품 수정 중 오류가 발생했습니다.');
      console.error('상품 수정 실패:', err);
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

  if (error) {
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 뒤로가기 버튼 */}
      <div className="mb-6">
        <Button
          as={Link}
          href={`/items/${productId}`}
          appearance="secondary"
          className="inline-flex items-center gap-2"
        >
          ← 뒤로가기
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">상품 수정</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 상품명 */}
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

          {/* 상품 설명 */}
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

          {/* 가격 */}
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

          {/* 태그 */}
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

          {/* 제출 버튼 */}
          <div className="flex gap-3 pt-6">
            <Button
              as={Link}
              href={`/items/${productId}`}
              appearance="secondary"
              className="flex-1"
            >
              취소
            </Button>
            <Button type="submit" appearance="primary" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? '수정 중...' : '수정하기'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditPage;
