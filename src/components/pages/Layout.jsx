import { useState } from "react";
import React from "react";
import { Outlet } from "react-router";

function Layout() {
  const [products, setProducts] = useState([]);
  return (
    <>
      <Outlet context={[products, setProducts]} />
    </>
  );
}

export default Layout;
