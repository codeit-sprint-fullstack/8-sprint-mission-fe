import React from "react";

export default function BestProducts({ items }) {
  return (
    <section>
      <div>
        <h1>베스트 상품</h1>
        {/* <ul>
          {items.map((item) => {
            // map을 이용해서 렌더링
            return (
              <li key={item.id}>
                <ProductItem item={item} />
              </li>
            );
          })}
        </ul> */}
      </div>
    </section>
  );
}
