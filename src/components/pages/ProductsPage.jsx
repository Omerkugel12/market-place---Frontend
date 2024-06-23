import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

const PRODUCTS_URL = "http://localhost:3000/api/product";

function ProductsPage() {
  const [products, setProducts] = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function getProducts() {
      try {
        const { data } = await axios.get(PRODUCTS_URL);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => {
          return (
            <Link key={product._id} to={product._id}>
              <li>{product.name}</li>
            </Link>
          );
        })}
      </ul>
      <button onClick={() => navigate("create", { replace: true })}>
        Add product
      </button>
    </div>
  );
}

export default ProductsPage;
