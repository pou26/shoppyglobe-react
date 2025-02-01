import React, { Suspense, lazy } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import App from "./App.jsx";
import Spinner from "./components/Spinner.jsx"; 

// Lazy-loaded components
const NotFound = lazy(() => import("./components/NotFound.jsx"));
const ProductList = lazy(() => import("./components/ProductList.jsx"));
const ProductDetail = lazy(() => import("./components/Product-Detail.jsx"));
const Cart = lazy(() => import("./components/Cart.jsx"));
const Checkout = lazy(() => import("./components/Checkout.jsx"));
const Home = lazy(() => import("./components/Home.jsx"));

// Define routes with lazy loading and spinner
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { 
        path: "/", 
        element: (
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        ) 
      },
      { 
        path: "/productlist", 
        element: (
          <Suspense fallback={<Spinner />}>
            <ProductList />
          </Suspense>
        ) 
      },
      { 
        path: "/productlist/:category", 
        element: (
          <Suspense fallback={<Spinner />}>
            <ProductList />
          </Suspense>
        ) 
      },
      { 
        path: "/product/:id", 
        element: (
          <Suspense fallback={<Spinner />}>
            <ProductDetail />
          </Suspense>
        ) 
      },
      { 
        path: "/cart", 
        element: (
          <Suspense fallback={<Spinner />}>
            <Cart />
          </Suspense>
        ) 
      },
      { 
        path: "/checkout", 
        element: (
          <Suspense fallback={<Spinner />}>
            <Checkout />
          </Suspense>
        ) 
      },
    ],
    errorElement: (
      <Suspense fallback={<Spinner />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

// Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>
);
