import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../src/pages/MainPage.jsx';
import MarketPage from '../src/pages/MarketPage.jsx';
import ProductPathPage from '../src/pages/ProductPathPage.jsx';

function App() {
  const [num, setNum] = useState(1);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/items' element={<MarketPage/>} />
        <Route path='/registration' element={<ProductPathPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
