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
import { House, LogIn, ShoppingCart } from "lucide-react";

function App() {
  function TopNavBar(props) {
    const { href, children } = props;
    return (
      <NavLink
        style={({ isActive }) => {
          return isActive ? { color: "#fff", textDecoration: "underline" } : {};
        }}
        to={href}
        className="text-xl hover:text-2xl transition-all flex justify-center items-center gap-1"
      >
        {children}
      </NavLink>
    );
  }
  return (
    <>
      <nav className="bg-slate-400 flex justify-between px-10 py-4 sticky top-0 z-10">
        <h1 className="font-bold text-3xl">OK-Market</h1>
        <ul className="flex gap-7">
          <li>
            <TopNavBar href={"/"}>
              <House size={20} className="text-inherit" strokeWidth={1.5} />{" "}
              Home
            </TopNavBar>
          </li>
          <li>
            <TopNavBar href={"/products"}>
              <ShoppingCart
                size={20}
                className="text-inherit"
                strokeWidth={1.5}
              />{" "}
              Products
            </TopNavBar>
          </li>
          <li>
            <TopNavBar href={"/register"}>Register</TopNavBar>
          </li>
          <li>
            <TopNavBar href={"/login"}>
              <LogIn size={20} className="text-inherit" strokeWidth={1.5} />{" "}
              Login
            </TopNavBar>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Layout />}>
          <Route index element={<ProductsPage />} />
          <Route path=":productId" element={<ProductDetails />} />
          <Route path="create" element={<ProductsPage />}>
            <Route index element={<CreateProductPage />} />
          </Route>
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
