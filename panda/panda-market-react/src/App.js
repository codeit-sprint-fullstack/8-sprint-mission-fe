import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ItemsPage from './pages/ItemsPage';
import Registration from './pages/Registration';
import ItemDetailPage from './pages/ItemDetailPage';

import HomePage from './pages/HomePage';
import './styles/reset.css';


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/items/:id" element={<ItemDetailPage />} />

        <Route path="/" element={<HomePage />} />

      </Routes>
    </Router>
  );
}

export default App;