import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 기본 메인 페이지 컴포넌트
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import SectionBestItem from "./components/SectionBestItem";
import SectionSearch from "./components/SectionSearch";
import SectionRegister from "./components/SectionRegister";
import SectionBottomCTA from "./components/SectionBottomCTA";

// 인증 관련 페이지
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// 마켓 페이지 관련
import MarketPage from "./pages/MarketPage/MarketPage";
import MarketHeader from "./components/Layout/Header";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          {/* 메인 페이지 */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Hero />
                <SectionBestItem />
                <SectionSearch />
                <SectionRegister />
                <SectionBottomCTA />
                <Footer />
              </>
            }
          />

          {/* 로그인 / 회원가입 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 마켓 페이지 */}
          <Route
            path="/market"
            element={
              <>
                <MarketHeader />
                <div className="withHeader">
                  <MarketPage />
                </div>
                <Footer />
              </>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
