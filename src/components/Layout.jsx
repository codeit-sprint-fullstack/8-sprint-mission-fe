import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function DefaultLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default { 
  DefaultLayout
};