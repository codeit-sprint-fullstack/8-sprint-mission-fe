import ProductsItem from "./ProductsItem";
import "./ProductsList.css";
import ic_search from "../../assets/icon/ic_search.svg";

function Pagination(){
  
}

function ProductsList({ items }) {
  return (
    <section className="productsList">
      <div className="section-wrap">
        <div className="productsList-header">
          <h1>판매 중인 상품</h1>
          <div className="action-box">
            <div className="input-box">
              <img src={ic_search} alt="ic_search" />
              <input
                name="search"
                type="text"
                placeholder="검색할 상품을 입력해주세요"
              />
            </div>
            <button className="product-register">상품 등록하기</button>
            <button>최신순</button>
          </div>
        </div>
        <ul className="productsList-container">
          {items.map((item) => {
            // map을 이용해서 렌더링
            return (
              <li key={item.id}>
                <ProductsItem item={item} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default ProductsList;
