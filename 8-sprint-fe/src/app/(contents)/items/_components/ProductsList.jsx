"use client";
import { fetchProducts } from "@/api/fetchProducts";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import Link from "next/link";

const ProductsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState("recent");

  const {
    data: products,
    isPending,
    error,
  } = useQuery({
    queryKey: ["produts", currentPage, order],
    queryFn: () => fetchProducts({ page: currentPage, orderBy: order }),
  });

  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">로딩 중...</div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error.message}
      </div>
    );
  }

  return (
    <div>
      <p>판매 중인 상품</p>
      <ul className="grid grid-cols-5 gap-y-10 gap-x-6">
        {products.list.map((product) => {
          return (
            <li key={product.id}>
              <Link href={`/items/${product.id}`}>
                <ProductItem item={product} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductsList;
