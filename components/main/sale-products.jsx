import React from 'react';
import ReactDOM from 'react-dom/client';
import Test1 from '../test.jsx';

const root = ReactDOM.createRoot(document.getElementById('sale-products-container'));
root.render(
    <>
        <h2>판매 중인 상품</h2>
        <Test1 />
    </>
);