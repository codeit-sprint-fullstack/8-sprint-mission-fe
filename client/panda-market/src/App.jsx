// src/App.jsx
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Market from './pages/Market';

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '24px 16px' }}>
        <Market />
      </main>
      <Footer />
    </>
  );
}

