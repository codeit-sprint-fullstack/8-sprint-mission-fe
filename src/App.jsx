import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import MarketPage from "./pages/MarketPage.jsx";
import "./css/app.css";

export default function App() {
  return (
    <>
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<MarketPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
