import React from 'react';
import Header from '/src/components/Header.jsx';  
import Footer from '/src/components/Footer.jsx';  
import BestProducts from '/src/components/BestProducts.jsx';
import SaleProducts from '/src/components/SaleProducts';


const App = () => {
  return (
    <div>
      <Header />
      <BestProducts />
      <SaleProducts />
      <Footer />
    </div>
  );
};

export default App;
