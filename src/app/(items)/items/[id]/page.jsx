'use client';

import { useParams } from 'next/navigation';
import ProductDetailPage from '@/components/pages/ProductDetailPage';

export default function ItemDetailPage() {
  const params = useParams();
  const itemId = params.id;

  return <ProductDetailPage productId={itemId} />;
}
