import React, {useEffect, useState} from "react";
import productService from "../../../scripts/apis/ProductService.js";
import "../../../styles/items.css"
import SaleProductCard from "./productCard/saleProductCard.jsx";

function ShowSaleProductData({pageSize, productNumber, orderBy}) {
    const [productData, setProductData] = useState([]); // 상품 데이터
    const [orderData, setOrderData] = useState(orderBy || "recent"); // 상품의 정렬 기준
    const [pageData, setPageData] = useState(pageSize || 1); // 현재 페이지
    const [totalPage, setTotalPage] = useState(9999999); // 전체 페이지 수
    const [keywordData, setKeywordData] = useState(""); // 실제 검색을 위한 상태값
    const [tempKeywordData, setTempKeywordData] = useState(""); // 입력창을 위한 상태값

    useEffect(() => {
        async function fetchData() { // 상품 데이터 불러오기
            const options = {
                page: pageData,
                pageSize: productNumber,
                orderBy: orderData,
                keyword: keywordData,
            };

            try {
                const response = await productService.getProductList(options);
                setProductData(response.list || []);
            } catch (error) {
                console.error('Error fetching data:', error);
                setProductData([]);
            }
        }

        async function getTotalPageCount(productNumber) { // 전체 페이지 수 계산
            try {
                // 전체 페이지만 불러오므로, 작동이 되는 URL을 하드코딩하여 사용
                const response = await fetch("https://panda-market-api.vercel.app/products?page=1&pageSize=1&orderBy=recent");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const totalCount = data.totalCount || 0;
                const totalPageCount = Math.ceil(totalCount / productNumber);
                setTotalPage(totalPageCount);
            } catch (error) {
                throw new Error(error);
            }
        }

        fetchData();
        getTotalPageCount(productNumber);
    }, [productNumber, orderData, pageData, keywordData]);

    return(
        <>
            {/* "판매 중인 상품"을 나타내는 헤더 */}
            <div className={"sale-product-header"}>
                <h2 className={"product-category"}>판매 중인 상품</h2>
                <div className={"sale-product-header-right-section"}>
                    <div className="product-search-container">
                        <img
                            src="images/icons/ic_search.svg"
                            alt="검색"
                            className="search-icon"
                        />
                        <input
                            className="product-search-input"
                            placeholder="검색할 상품을 입력해주세요."
                            value={tempKeywordData}
                            onChange={e => setTempKeywordData(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    setPageData(1);
                                    setKeywordData(tempKeywordData);
                                }
                            }}
                        />
                    </div>
                    <button className={"product-register-btn"}>
                        <span className={"product-register-btn-text"}>상품 등록하기</span>
                    </button>
                    <div className={"product-order-select-wrapper"}>
                        <select
                            className="product-order-select"
                            value={orderData}
                            onChange={(e) => setOrderData(e.target.value)}
                        >
                            <option value="recent">최신순</option>
                            <option value="favorite">좋아요순</option>
                        </select>
                        <img src={"/images/icons/ic_arrow_down.svg"} className={"product-order-select-arrow"} alt="화살표 아이콘"/>
                    </div>
                </div>
            </div>
            {/* 판매 중인 상품 리스트 */}
            {/* TODO: 기기의 크기에 따라 "중고 마켓의 카드 컴포넌트 반응형" 구현 */}
            <ul className="product-grid-container sale-product-grid">
                {productData.map((item) => (
                    <li key={item.id}>
                        <SaleProductCard item={item}/>
                    </li>
                ))}
            </ul>
            {/* 페이지네이션 기능 구현 */}
            {/* TODO: 페이지네이션 Figma 스타일 적용 */}
            <div className={'product-pagination-grid'}>
                <img
                    src="images/icons/ic_arrow_left.svg"
                    className="product-pagination-prepage"
                    onClick={() => {
                        // 이전 페이지가 1보다 작으면, 페이지 이동을 하지 않도록 설정
                        const newPage = pageData - 1 > 1 ? pageData - 1 : 1;
                        setPageData(newPage);
                    }}
                    alt="이전 페이지"
                />
                {/* TODO: 페이지네이션 아이콘 클릭 시 페이지 이동 기능 구현 */}
                {/* TODO: 반응형에 따른 페이지 네이션 기능을 구현 */}
                <div className={"product-pagination-btn"}>
                    <div className={"product-pagination-btn-text"}>{pageData}</div>
                </div>
                <div className={"product-pagination-btn"}>
                    <div className={"product-pagination-btn-text"}>{(pageData+1)}</div>
                </div>
                <div className={"product-pagination-btn"}>
                    <div className={"product-pagination-btn-text"}>{(pageData+2)}</div>
                </div>
                <div className={"product-pagination-btn"}>
                    <div className={"product-pagination-btn-text"}>{(pageData+3)}</div>
                </div>
                <div className={"product-pagination-btn"}>
                    <div className={"product-pagination-btn-text"}>{(pageData+4)}</div>
                </div>
                <img
                    src="images/icons/ic_arrow_left.svg"
                    className="product-pagination-nextpage"
                    onClick={() => {
                        // 다음 패이지가 totalPage보다 크면, 페이지 이동을 하지 않도록 설정
                        const newPage = pageData + 1 >= totalPage ? totalPage : pageData + 1;
                        setPageData(newPage);
                    }}
                    alt="다음 페이지"
                />
            </div>
        </>
    );
}

export default ShowSaleProductData;