import React from "react";
import "./styles/global/reset.css";
import "./styles/global/global.css";
import "../public/font/fonts.css";
import "./App.css";
// Header import
import HeaderMarket from "./components/layout/Header/HeaderMarket.jsx";
// Footer import
import Footer from "./components/layout/Footer/Footer";

function App() {
  return (
    <div className="App">
      <HeaderMarket />
      <Footer />
    </div>
  );
}

export default App;