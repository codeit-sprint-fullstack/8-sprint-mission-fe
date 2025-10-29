"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchProduct, updateProduct } from "@/api/product";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ProductForm from "@/components/Registration/ProductForm";

const ProductEditPage = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState({
    img: "",
    title: "",
    description: "",
    price: "",
    tags: [],
  });
  const router = useRouter();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProduct(id);
        setInitialData({
          img: data.img,
          title: data.title,
          description: data.description,
          price: data.price,
          tags: data.tags,
        });
      } catch (error) {
        console.error("상품 상세 불러오기 에러:", error);
      }
    };

    getProduct();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await updateProduct(id, data);
      router.push(`/items/${id}`);
    } catch (error) {
      console.error("상품 수정 에러:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-stretch mx-auto mb-[200px] p-4 w-full max-w-[1200px]">
        <ProductForm
          initialData={initialData}
          onSubmit={handleUpdate}
          mode="edit"
        />
      </main>

      <Footer />
    </div>
  );
};

export default ProductEditPage;
