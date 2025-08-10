import Header from './Header/Header';
import Footer from './Footer/Footer';
import BestProductList from './ProductList/BestProductList/BestProductList';
import ProductListController from './ProductList/ProductListController/ProductListController';
import ProductList from './ProductList/ProductList';
import style from '../style/style.css';

function App() {
  return (
    <>
      <Header />

      <main>
        <section>
          <BestProductList />
        </section>
        
        <section>
          <ProductListController />
          <ProductList />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;