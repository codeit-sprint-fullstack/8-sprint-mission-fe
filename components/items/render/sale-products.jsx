import React from 'react';
import ReactDOM from 'react-dom/client';
import ShowSaleProductData from "../page/ShowSaleProductData.jsx";

const root = ReactDOM.createRoot(document.getElementById('sale-products-container'));
root.render(<ShowSaleProductData page={1} productNumber={10} orderBy={'recent'} />);