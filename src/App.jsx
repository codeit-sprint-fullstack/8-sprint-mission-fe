import { Routes, Route } from 'react-router-dom'
import HomeLayout from './components/HomeLayout.jsx'
import MarketLayout from './components/MarketLayout.jsx'

import LandingPage from './pages/LandingPage.jsx'
import ItemsPage from './pages/ItemsPage.jsx'
import RegistrationPage from './pages/RegistrationPage.jsx'
import ItemDetailPage from './pages/ItemDetailPage.jsx'

export default function App(){
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      <Route element={<MarketLayout />}>
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/items/:id" element={<ItemDetailPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
      </Route>
    </Routes>
  )
}