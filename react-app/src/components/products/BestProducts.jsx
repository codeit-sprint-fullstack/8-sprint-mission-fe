import ProductsItem from "./ProductsItem";
import "./BestProducts.css";

function BestProducts({ items }) {
  return (
    <section className="bestProducts">
      <div className="section-wrap">
        <h1>베스트 상품</h1>
        <ul className="bestProducts-container">
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

export default BestProducts;
