import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import ProductsPage from "./components/pages/ProductsPage";
import ProductDetails from "./components/pages/ProductDetailsPage";
import CreateProductPage from "./components/pages/CreateProductPage";
import NotFoundPage from "./components/pages/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products">
          <Route index element={<ProductsPage />} />
          <Route path=":id" element={<ProductDetails />} />
          <Route path="create" element={<CreateProductPage />} />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
