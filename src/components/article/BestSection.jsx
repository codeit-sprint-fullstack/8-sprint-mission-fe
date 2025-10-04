import React from 'react';
import BestItem from '@/components/article/BestItem';
import { useRouter } from 'next/navigation';

export default function BestSection({ items }) {
  const router = useRouter();
  const handleClick = (id) => {
    router.push(`/article/${id}`);
  };

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--gray-900)' }}>
            베스트 상품
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} onClick={() => handleClick(item.id)} style={{ cursor: 'pointer' }}>
              <BestItem item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
