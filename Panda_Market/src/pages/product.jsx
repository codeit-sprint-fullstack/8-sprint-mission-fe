import React from "react";
import ProductSection from "../components/ProductSection.jsx";

export default function ProductPage() {
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