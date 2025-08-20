import { useCallback, useEffect, useState } from "react";
import { getProduct } from "../lib/api.js";
import ProductApi from "../lib/ProductApi.js";
import ProductCard from "./ProductCard.jsx";
import "../styles/ProductList.css";
import ProductListHeader from "./ProductListHeader.jsx";
import Pagination from "./Pagination.jsx";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(null);
  const [search, setSearch] = useState("");
  const [sortValue, setSortValue] = useState("recent");
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProduct = useCallback(
    async (
      options = {
        page: 1,
        limit: 10,
        sort: sortValue,
        search: search,
      }
    ) => {
      let result;

      try {
        console.log(`API Current Page: ${options.page}`);

        setLoadingError(null);
        setLoading(true);
        result = await ProductApi(options);
        setProducts(result.products);
        setCurrentPage(options.page);
        setLoadingStatus("APi Loading Success");
      } catch (error) {
        setLoadingError(error);
        setLoadingStatus(`Error: ${error.message}`);
        return;
      } finally {
        setLoading(false);
      }
    },
    [search, sortValue]
  );

  useEffect(() => {
    fetchProduct({
      page: 1,
      limit: 10,
      sort: sortValue,
      search: search,
    });
  }, [search, sortValue, fetchProduct]);

  return (
    <div className="productList">
      <ProductListHeader
        search={search}
        setSearch={setSearch}
        sortValue={sortValue}
        setSortValue={setSortValue}
      />
      <div className="productCardList">
        {products.map((product) => {
          return (
            <ProductCard product={product} key={product._id} type={"regular"} />
          );
        })}
      </div>
      <Pagination
        pagination={pagination}
        setPagination={setPagination}
        fetchProduct={fetchProduct}
        currentPage={currentPage}
      />
    </div>
  );
}

export default ProductList;
