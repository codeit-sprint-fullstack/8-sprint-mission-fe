import React from 'react';
import ReactDOM from 'react-dom/client';
import ShowSaleProductPage from "./page/ShowSaleProductPage.jsx";
import ShowBestProductPage from "./page/ShowBestProductPage.jsx";

const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(
    <>
        <ShowBestProductPage productNumber={4} />
        <ShowSaleProductPage pageSize={1} productNumber={10} orderBy={'recent'} />
    </>
);