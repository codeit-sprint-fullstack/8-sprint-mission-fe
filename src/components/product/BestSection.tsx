import React from 'react';
import ProductItem from '@/components/product/ProductItem';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';

interface BestProductSectionProps {
  items: Product[];
}

export default function BestProductSection({ items }: BestProductSectionProps) {
  const router = useRouter();
  const handleClick = (id: string | number) => {
    router.push(`/items/${id}`);
  };

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--gray-900)' }}>
            베스트 상품
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.id)}
              style={{ cursor: 'pointer' }}
              className={`
                ${index === 0 ? 'block' : 'hidden'}
                ${index < 2 ? 'md:block' : 'md:hidden'}
                ${index < 4 ? 'lg:block' : 'lg:hidden'}
              `}
            >
              <ProductItem product={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
