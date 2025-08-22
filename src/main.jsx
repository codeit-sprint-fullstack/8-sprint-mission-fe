import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App.jsx";
import ProductListPage from "./pages/ProductListPage.jsx";
import HomPage from "./pages/HomePage.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App>
      <Routes>
        <Route path="/" element={<HomPage />} />
        <Route path="/items" element={<ProductListPage />} />
      </Routes>
    </App>
  </BrowserRouter>
);
