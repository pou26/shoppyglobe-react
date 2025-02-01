import React, { useState, Suspense } from "react";
import "./Home.css";
import "../App.css";

const Search = React.lazy(() => import("./Search"));
const Carousel = React.lazy(() => import("./Carousel"));
const ProductList = React.lazy(() => import("./ProductList"));

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="home">
      <Suspense fallback={<p>Loading Carousel...</p>}>
        <Carousel />
      </Suspense>
      <div className="search-wrap">
        <Suspense fallback={<p>Loading Search...</p>}>
          <Search filterFunction={setSearchQuery} />
        </Suspense>
      </div>
      <Suspense fallback={<p>Loading Products...</p>}>
        <ProductList />
      </Suspense>
    </section>
  );
};

export default Home;
