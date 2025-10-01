"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ProductCard from "@/components/Items/ProductCard";
import ProductListController from "@/components/Items/ProductListController";
import PageButton from "@/components/Items/PageButton";
import { fetchProducts } from "@/api/product";

const ItemPage = () => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [nowPage, setNowPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts({ page: nowPage, limit: pageSize });

        setProducts(data);
        setSortedProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [nowPage]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-stretch mx-auto mb-[200px] p-4 w-full max-w-[1200px]">
        <section>
          <ProductListController
            controls={{ search: true, orderBy: true }}
            option={{ search: true, orderBy: true, upload: true }}
            products={products}
            setSortedProducts={setSortedProducts}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {(sortedProducts ?? []).map((product) => (
              <ProductCard key={product.id} product={product} {...product} />
            ))}
          </div>
          <PageButton
            nowPage={nowPage}
            pageSize={pageSize}
            totalCount={100}
            onChange={setNowPage}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ItemPage;
