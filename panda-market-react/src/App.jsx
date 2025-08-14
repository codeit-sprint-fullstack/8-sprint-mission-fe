import { Route, Routes } from 'react-router-dom';
import { ProductListPage } from './pages/ProductListPage';
import { Layout } from './components/organisms/Layout';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { MainPage } from './pages/MainPage';
import { RegistrationPage } from './pages/RegistrationPage';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/items" element={<ProductListPage />} />
          <Route path="/items/:id" element={<ProductDetailPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
