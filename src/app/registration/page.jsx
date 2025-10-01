"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Controller from "@/components/RegistrationPage/Controller";
import InputForm from "@/components/RegistrationPage/InputForm";
import ItemTag from "@/components/Items/ItemTag";

const RegistrationPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex flex-col items-stretch mx-auto mb-[200px] p-4 w-full max-w-[1200px]">
        {/* <Controller /> */}
        <p>상품 등록 페이지 마이그래이션</p>
        {/* <InputForm /> */}
      </main>

      <Footer />
    </div>
  );
};

export default RegistrationPage;
