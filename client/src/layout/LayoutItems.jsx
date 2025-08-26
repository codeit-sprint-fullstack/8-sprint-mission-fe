import Header from "../components/Header.jsx";
import { BestProduct } from "../components/BestProduct.jsx";
import ProductList from "../components/ProductList.jsx";
import Footer from "../components/Footer.jsx";

function LayoutItems() {
  return (
    <>
      <Header />
      {/* <BestProduct /> */}
      <ProductList />
      <Footer />
    </>
  );
}

export default LayoutItems;
