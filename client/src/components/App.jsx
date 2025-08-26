import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage.jsx";
import LayoutItems from "../layout/LayoutItems.jsx";
import LayoutCreateProduct from "../layout/LayoutCreateProduct.jsx";
import ProductDetail from "./ProductDetail.jsx";
import "../styles/global.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="items" element={<LayoutItems />} />
        <Route path="registration" element={<LayoutCreateProduct />} />
        <Route path="/items/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
