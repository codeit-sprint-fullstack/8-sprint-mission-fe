import React from 'react';
import ProductSection from './src/components/ProductSection.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <ProductSection
          title="베스트 상품"
          defaultSort="favorite"
          showToolbar={false}
          cols={{ desktop: 4, tablet: 2, mobile: 1 }}
          limit={4}
        />
        <ProductSection
          title="판매 중인 상품"
          defaultSort="latest"
          showToolbar={true}
          cols={{ desktop: 5, tablet: 3, mobile: 2 }}
          pageSizeMap={{ desktop: 10, tablet: 6, mobile: 4 }}
        />
      </main>
      <Footer />
    </>
  );
}