import { Route, Routes } from 'react-router-dom';
import { ProductListPage } from './pages/ProductListPage';
import { Layout } from './components/layout/Layout';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProductListPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
