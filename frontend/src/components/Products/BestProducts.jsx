import ProductItem from "./ProductItem";
import style from "./BestProducts.module.css";

function BestProducts({ items }) {
  return (
    <section className={style.bestProducts}>
      <div className="section-wrap">
        <h1>베스트 상품</h1>
        <ul className={style.bestProductsContainer}>
          {items.map((item) => {
            // map을 이용해서 렌더링
            return (
              <li key={item.id}>
                <ProductItem item={item} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default BestProducts;
