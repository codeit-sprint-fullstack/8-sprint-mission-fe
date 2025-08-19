import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SectionBestItem from "./components/SectionBestItem";
import SectionSearch from "./components/SectionSearch";
import SectionRegister from "./components/SectionRegister";
import SectionBottomCTA from "./components/SectionBottomCTA";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SectionBestItem />
        <SectionSearch />
        <SectionRegister />
        <SectionBottomCTA />
        <Footer />
      </main>
    </>
  );
}

export default App;
