import { Route, Routes } from 'react-router-dom'
import { ProductListPage } from './pages/ProductListPage'

function App() {

  return (
    <>
      <h1>판다마켓</h1>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
      </Routes>
    </>
  )
}

export default App
