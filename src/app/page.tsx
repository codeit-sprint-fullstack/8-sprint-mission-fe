import React from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Desktop from "@/components/LandingPage/Desktop";
import InfoCard from "@/components/LandingPage/InfoCard";
import DeskBottom from "@/components/LandingPage/DeskBottom";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <Desktop />
      <main className="flex-1 flex flex-col items-stretch mx-auto w-full max-w-[1200px]">
        <InfoCard />
      </main>
      <DeskBottom />

      <Footer />
    </div>
  );
};

export default LandingPage;
