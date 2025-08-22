import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import MarketPage from "./pages/MarketPage.jsx";
import LandingPage from "./pages/LandingPage.jsx"; // 랜딩 페이지
import RegistrationPage from "./pages/RegistrationPage.jsx"; // 상품 등록 페이지
import ProductDetailPage from "./pages/ProductDetailPage.jsx";

import "./css/app.css";

export default function App() {
  return (
    <>
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/items" element={<MarketPage />} />
          <Route path="/items/:id" element={<ProductDetailPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
