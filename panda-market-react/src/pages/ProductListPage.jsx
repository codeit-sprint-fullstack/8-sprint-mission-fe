import { useEffect, useState } from 'react';
import { ProductCard } from '../components/molecules/ProductCard';
import styles from '../styles/pages/ProductListPage.module.css';
import { getBestProducts, getProducts } from '../api/productsApi';
import { ProductListTitle } from '../components/atoms/ProductListTitle';

export function ProductListPage() {
  const [bestProductsList, setBestProductsList] = useState([]);
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    const getBestProductsList = async () => {
      try {
        const response = await getBestProducts();
        const sortedList = response.list.sort((a, b) => b.favoriteCount - a.favoriteCount);
        console.log(sortedList);
        setBestProductsList(sortedList);
      } catch (error) {
        console.error(error);
      }
    };
    getBestProductsList();

    const getProductsList = async () => {
      try {
        const response = await getProducts();
        console.log(response);
        setProductsList(response.list);
      } catch (error) {
        console.log(error);
      }
    };
    getProductsList();
  }, []);

  return (
    <>
      <main className={styles.main}>
        <section className={styles.productListSection}>
          <ProductListTitle title="베스트 상품" />
          <div className={styles.bestProductList}>
            {bestProductsList.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.images[0]}
                  favoriteCount={product.favoriteCount}
                />
              );
            })}
          </div>
        </section>
        <section>
          <ProductListTitle title="판매 중인 상품" />
          <div className={styles.productList}>
            {productsList.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.images[0]}
                  favoriteCount={product.favoriteCount}
                />
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
