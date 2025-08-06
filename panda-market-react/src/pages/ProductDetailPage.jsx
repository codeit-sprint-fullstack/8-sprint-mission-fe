import { useParams } from 'react-router-dom';

export function ProductDetailPage() {
  const { id } = useParams();

  return (
    <main style={{ padding: '9rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.4rem', fontWeight: '700' }}>ProductDetailPage</h1>
      <h2 style={{ fontSize: '1.6rem', fontWeight: '500' }}>product id : {id}</h2>
    </main>
  );
}
