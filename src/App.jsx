import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import ProductsPage from "./components/pages/ProductsPage";
import ProductDetails from "./components/pages/ProductDetailsPage";
import CreateProductPage from "./components/pages/CreateProductPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import Layout from "./components/pages/Layout";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";

function App() {
  function TopNavBar(props) {
    const { href, children } = props;
    return (
      <NavLink
        style={({ isActive }) => {
          return isActive ? { color: "#fff", textDecoration: "underline" } : {};
        }}
        to={href}
      >
        {children}
      </NavLink>
    );
  }
  return (
    <>
      <nav className="bg-slate-400 flex justify-between px-10 py-4">
        <h1 className="font-bold font">OK-Market</h1>
        <ul className="flex gap-7">
          <li>
            <TopNavBar href={"/"}>Home</TopNavBar>
          </li>
          <li>
            <TopNavBar href={"/products"}>Products</TopNavBar>
          </li>
          <li>
            <TopNavBar href={"/register"}>Register</TopNavBar>
          </li>
          <li>
            <TopNavBar href={"/login"}>Login</TopNavBar>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Layout />}>
          <Route index element={<ProductsPage />} />
          <Route path=":productId" element={<ProductDetails />} />
          <Route path="create" element={<CreateProductPage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
