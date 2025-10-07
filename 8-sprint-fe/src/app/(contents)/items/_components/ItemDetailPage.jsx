"use client";
import { fetchProduct } from "@/api/fetchProducts";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function ItemDetailPage({ id }) {
  const {
    data: product,
    isPending,
    error,
  } = useQuery({
    queryKey: ["produt", id],
    queryFn: fetchProduct,
  });

  return <div>ItemDetailPage</div>;
}
