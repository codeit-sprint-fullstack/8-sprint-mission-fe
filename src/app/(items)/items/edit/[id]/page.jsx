'use client';

import { useParams } from 'next/navigation';
import ProductEditPage from '@/components/pages/ProductEditPage';

export default function ItemEditPage() {
  const params = useParams();
  const itemId = params.id;

  return <ProductEditPage productId={itemId} />;
}
