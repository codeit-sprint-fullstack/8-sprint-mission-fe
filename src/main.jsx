// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '/src/App.jsx';  // 상대경로로 변경

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
