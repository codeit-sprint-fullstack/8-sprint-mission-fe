import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import MarketPage from "./pages/MarketPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import "./css/app.css";

export default function App() {
  return (
    <>
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/market" element={<MarketPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
