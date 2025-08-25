import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/home.css';
import MarketPage from './pages/MarketPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Privacy from './pages/Privacy';
import Faq from './pages/Faq';

export default function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<MarketPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
        </>
    );
}

function NotFound() {
    return (
        <main className="wrapper" style={{ padding: '40px 0' }}>
            <h2>페이지를 찾을 수 없습니다.</h2>
        </main>
    );
}
