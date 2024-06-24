import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

const PRODUCTS_URL = "http://localhost:3000/api/product";
// const URL = "http://localhost:5173/products";

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
    <div className="px-5 pt-4">
      <h1 className="text-indigo-700 font-bold text-3xl ">Products</h1>
      <ul className="flex flex-wrap gap-10 ">
        {products.map((product) => {
          return (
            <Link key={product._id} to={product._id}>
              <li className=" w-80 p-10 shadow-2xl shadow-500-grey flex-col space-y-6 justify-">
                <p>{product.name}</p>
                <p>{product.price}$</p>
                <p>{product.category}</p>
              </li>
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
