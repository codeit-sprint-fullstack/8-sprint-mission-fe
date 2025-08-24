import ReactDOM from 'react-dom/client';
import { BrowserRouter, StrictMode } from 'react';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);