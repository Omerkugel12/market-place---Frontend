import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Link,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";

const PRODUCTS_URL = "http://localhost:3000/api/product";
const URL_web = "http://localhost:5173/products";

function ProductsPage() {
  const [products, setProducts] = useOutletContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function getProducts() {
      const options = {
        params: {
          name: searchParams.get("name"),
        },
      };
      try {
        const { data } = await axios.get(PRODUCTS_URL, options);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, [searchParams]);

  // const handleSearchChange = (e) => {
  //   setSearchParams({ name: e.target.value }, { replace: true });
  // };

  function handleFilterChange(ev) {
    const inputName = ev.target.name;
    const value = ev.target.value;
    searchParams.set(inputName, value);
    setSearchParams(searchParams);
  }

  return (
    <div className="px-5 pt-4">
      <h1 className="text-indigo-700 font-bold text-3xl ">Products</h1>
      <div>
        <h3>search by name</h3>
        <input
          type="text"
          name="name"
          value={searchParams.get("name" || "")}
          onChange={handleFilterChange}
          placeholder="Enter product name..."
        />
      </div>
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
