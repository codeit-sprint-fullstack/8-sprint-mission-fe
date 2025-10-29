"use client";

import { useRouter } from "next/navigation";
import { addProduct } from "@/api/product";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ProductForm from "@/components/Registration/ProductForm";

const RegistrationPage = () => {
  const router = useRouter();

  // 상품 등록 API
  const handleCreate = async (data) => {
    try {
      const newProduct = await addProduct(data);

      router.push(`items/${newProduct.id}`);
    } catch (error) {
      console.error("상품 등록 에러:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-stretch mx-auto mb-[200px] p-4 w-full max-w-[1200px]">
        <ProductForm onSubmit={handleCreate} mode="create" />
      </main>

      <Footer />
    </div>
  );
};

export default RegistrationPage;
