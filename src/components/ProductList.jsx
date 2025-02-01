import React, { Suspense } from "react";
import useFetchProducts from "../hooks/useFetchProducts";
import "./Product.css";

const ProductItem = React.lazy(() => import("./ProductItem"));

const ProductList = ({ addToCart }) => {
  const { products, loading, error } = useFetchProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map((product) => (
          <Suspense key={product.id} fallback={<p>Loading Product...</p>}>
            <ProductItem productDetail={product} addToCart={addToCart} />
          </Suspense>
        ))
      ) : (
        <p>No products available in this category.</p>
      )}
    </div>
  );
};

export default ProductList;
