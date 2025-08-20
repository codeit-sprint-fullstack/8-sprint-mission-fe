import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import SectionBestItem from "./components/SectionBestItem";
import SectionSearch from "./components/SectionSearch";
import SectionRegister from "./components/SectionRegister";
import SectionBottomCTA from "./components/SectionBottomCTA";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <SectionBestItem />
              <SectionSearch />
              <SectionRegister />
              <SectionBottomCTA />
            </>
          }/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
