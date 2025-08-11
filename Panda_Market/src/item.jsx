import React from 'react';
import { createRoot } from 'react-dom/client';
import ProductSection from './components/ProductSection.jsx';

function ItemsPage() {
  return (
    <>
      <ProductSection
        title="베스트 상품"
        defaultSort="favorite"
        showToolbar={false}
        cols={{ desktop: 4, tablet: 2, mobile: 1 }}
        limit={4}
        imageHeight={282}
      />

      <ProductSection
        title="판매 중인 상품"
        defaultSort="latest"
        showToolbar={true}
        cols={{ desktop: 5, tablet: 3, mobile: 2 }}
        pageSizeMap={{ desktop: 10, tablet: 6, mobile: 4 }}
        imageHeight={230}
      />
    </>
  );
}

createRoot(document.getElementById('root')).render(<ItemsPage />);