import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ItemDetailPage() {
  const { id } = useParams();
  return (
    <>
      <Header />
      <main className="item-detail-page" style={{ maxWidth: 1200, margin: '0 auto', padding: '26px 16px 120px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>상품 상세</h1>
        <p>임시 상품 ID: <strong>{id}</strong></p>
        <p>등록 성공 시 여기로 이동합니다.</p>
        <Link to="/items" style={{ color: '#3692FF', textDecoration: 'none' }}>목록으로</Link>
      </main>
      <Footer />
    </>
  );
}