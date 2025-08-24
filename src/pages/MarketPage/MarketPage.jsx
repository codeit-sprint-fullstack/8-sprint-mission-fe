import React from "react";
import BestItemsSection from "/src/pages/MarketPage/BestItemsSection";
import AllItemsSection from "/src/pages/MarketPage/AllItemsSection";
import "/src/assets/css/MarketPage.css";

function MarketPage() {
  return (
    <div className="wrapper">
      <BestItemsSection />
      <AllItemsSection />
    </div>
  );
}

export default MarketPage;
