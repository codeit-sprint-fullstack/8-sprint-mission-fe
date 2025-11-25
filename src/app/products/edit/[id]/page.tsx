'use client';

import ProductForm from '@/components/features/products/ProductForm';
import { useParams } from 'next/navigation';

const ProductEditPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="mx-auto mt-[26px] mb-[322px] max-w-[1200px]">
      <ProductForm productId={id} />
    </div>
  );
};

export default ProductEditPage;
