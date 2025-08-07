import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main style={{ padding: '9rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.4rem', fontWeight: '700' }}>NotFoundPage</h1>
      <Link to="/">홈으로 이동</Link>
    </main>
  );
}
