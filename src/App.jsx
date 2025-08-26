import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingHome from "./Components/LandingHome";
import SecondhandHome from "./Components/SecondhandHome";
import RegisterationHome from "./Components/RegisterationHome";
import ErrorBoundary from "./Components/ErrorBoundary";

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<LandingHome />} />
          <Route path="/items" element={<SecondhandHome />} />
          <Route path="/registration" element={<RegisterationHome />} />

          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;