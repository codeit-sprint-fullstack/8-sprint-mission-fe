import React from "react";
import BestItemsSection from "./components/BestItemsSection.jsx";
import AllItemsSection from "./components/AllItemsSection.jsx";
import "./MarketPage.css";

function MarketPage() {
  return (
    <div className="wrapper">
      <BestItemsSection />
      <AllItemsSection />
    </div>
  );
}

export default MarketPage;
