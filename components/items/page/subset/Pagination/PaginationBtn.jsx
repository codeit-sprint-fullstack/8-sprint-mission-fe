import React from "react";
import "../../../../../styles/items.css";

function PaginationBtn ({showPage}) {
    return (
        <>
            <div className={"product-pagination-btn"}>
                <div className={"product-pagination-btn-text"}>{showPage}</div>
            </div>
        </>
    );

}

export default PaginationBtn;