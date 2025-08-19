import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import ErrorBoundary from "./Components/ErrorBoundary";

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;