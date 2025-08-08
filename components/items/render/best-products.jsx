import React from 'react';
import ReactDOM from 'react-dom/client';
import ShowBestProductData from "../page/ShowBestProductData.jsx";

const root = ReactDOM.createRoot(document.getElementById('best-products-container'));
root.render(<ShowBestProductData productNumber={4} />);