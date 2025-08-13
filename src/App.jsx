
import React from "react";
import "./styles/global/global.css";
import "./styles/font/fonts.css";
import HeaderMarket from "./components/layout/Header/HeaderMarket";
import Footer from "./components/layout/Footer/Footer";
import Products from "./pages/Products/Products";  // Products

function App() {
  return (
    <div className="App">
      <HeaderMarket />
      <main>
        <Products />
      </main>
      <Footer />
    </div>
  );
}

export default App;