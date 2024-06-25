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
          category: searchParams.get("category"),
          minPrice: searchParams.get("minPrice"),
          maxPrice: searchParams.get("maxPrice"),
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
          value={searchParams.get("name") || ""}
          onChange={handleFilterChange}
          placeholder="Enter product name..."
        />
      </div>
      <div>
        <h3>Minimum price</h3>
        <input
          type="number"
          name="minPrice"
          value={searchParams.get("minPrice") || 0}
          onChange={handleFilterChange}
          placeholder="Enter product minimum price..."
        />
      </div>
      <div>
        <h3>Maximum price</h3>
        <input
          type="number"
          name="maxPrice"
          value={searchParams.get("MaxPrice") || 5000}
          onChange={handleFilterChange}
          placeholder="Enter product maximum price..."
        />
      </div>
      <select
        name="category"
        value={searchParams.get("category") || ""}
        onChange={handleFilterChange}
        required
      >
        <option value="">Select category</option>
        <option value="Accessories">Accessories</option>
        <option value="Home appliances">Home Appliances</option>
        <option value="Electronics">Electronics</option>
        <option value="Smart Home">Smart Home</option>
        <option value="Automotive">Automotive</option>
        <option value="Wearables">Wearables</option>
        <option value="Health">Health</option>
      </select>
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
