import React from 'react';
import ReactDOM from 'react-dom/client';
import ShowSaleProductData from "./page/ShowSaleProductData.jsx";
import ShowBestProductData from "./page/ShowBestProductData.jsx";

const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(
    <>
        <ShowBestProductData productNumber={4} />
        <ShowSaleProductData pageSize={1} productNumber={10} orderBy={'recent'} />
    </>
);