import ProductDetailPage from '@/components/pages/ProductDetailPage';

interface ItemDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ItemDetailPage({ params }: ItemDetailPageProps) {
  const { id } = await params;
  return <ProductDetailPage productId={id} />;
}
