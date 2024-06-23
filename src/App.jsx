import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import ProductsPage from "./components/pages/ProductsPage";
import ProductDetails from "./components/pages/ProductDetailsPage";
import CreateProductPage from "./components/pages/CreateProductPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import Layout from "./components/pages/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Layout />}>
          <Route index element={<ProductsPage />} />
          <Route path=":productId" element={<ProductDetails />} />
          <Route path="create" element={<CreateProductPage />} />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
