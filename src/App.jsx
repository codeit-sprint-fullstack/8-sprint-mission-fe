import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/home.css';
import MarketPage from './pages/MarketPage';

// 라우팅 대상 페이지는 필요 시 추가
function Placeholder({ title }) {
    return (
        <main className="wrapper" style={{ padding: '40px 0' }}>
            <h2>{title}</h2>
        </main>
    );
}

export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<MarketPage />} />
                <Route path="/login" element={<Placeholder title="로그인" />} />
                <Route
                    path="/signup"
                    element={<Placeholder title="회원가입" />}
                />
                <Route
                    path="/privacy"
                    element={<Placeholder title="Privacy Policy" />}
                />
                <Route path="/faq" element={<Placeholder title="FAQ" />} />
                <Route
                    path="*"
                    element={<Placeholder title="페이지를 찾을 수 없습니다." />}
                />
            </Routes>
            <Footer />
        </>
    );
}
