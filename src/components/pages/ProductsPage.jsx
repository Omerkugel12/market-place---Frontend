import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Link,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import { PRODUCT_BASE_URL } from "../../constansts/url.constant.js";
import Button from "../../UI/Button.jsx";
import H from "../../UI/H.jsx";
import { Search, X } from "lucide-react";
import Input from "../../UI/Input.jsx";

function ProductsPage() {
  const [products, setProducts] = useOutletContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpeningFilter, setIsOpeningFilter] = useState(false);

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
        const { data } = await axios.get(PRODUCT_BASE_URL, options);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, [searchParams]);

  function handleFilterSubmit(event) {
    event.preventDefault();
    setSearchParams(searchParams);
    setIsOpeningFilter(false);
  }

  function handleFilterChange(ev) {
    const inputName = ev.target.name;
    const value = ev.target.value;
    searchParams.set(inputName, value);
    setSearchParams(searchParams);
  }

  return (
    <div className="relative px-5 pt-4 flex flex-col items-center">
      <H one>Products</H>
      <Button
        className="absolute left-6"
        view
        onClick={() => setIsOpeningFilter(true)}
      >
        Filters
      </Button>
      <Button
        view
        className="absolute right-6"
        onClick={() => navigate("create", { replace: true })}
      >
        Add product
      </Button>
      <div className="flex items-center my-6">
        <form className="flex items-center max-w-md mx-auto">
          <Input
            type="text"
            name="name"
            value={searchParams.get("name") || ""}
            onChange={handleFilterChange}
            placeholder="Enter product name..."
            search
          />
          <Button className="px-6 py-3 rounded-r-full font-semibold transition duration-300 hover:bg-indigo-700">
            <Search size={26} color="#fff" strokeWidth={1.5} />
          </Button>
        </form>
      </div>
      {isOpeningFilter && (
        <form
          onSubmit={handleFilterSubmit}
          className="fixed bg-slate-700 p-6 space-y-6 rounded-md flex flex-col "
        >
          <Button
            danger
            className="absolute bg-inherit size-1 top-0 left-0 rounded-md"
            onClick={() => {
              setIsOpeningFilter(false);
            }}
          >
            <X color="#ff0000" strokeWidth={1.75} />
          </Button>
          <div>
            <H className="text-gray-200 text-left mb-0">Minimum price</H>
            <Input
              type="number"
              name="minPrice"
              value={searchParams.get("minPrice") || ""}
              onChange={handleFilterChange}
              placeholder="Enter product minimum price..."
            />
          </div>
          <div>
            <H className="text-gray-200 text-left mb-0">Maximum price</H>
            <Input
              type="number"
              name="maxPrice"
              value={searchParams.get("maxPrice") || ""}
              onChange={handleFilterChange}
              placeholder="Enter product maximum price..."
            />
          </div>
          <select
            className="p-2"
            name="category"
            value={searchParams.get("category") || ""}
            onChange={handleFilterChange}
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
          <Button>Filter</Button>
        </form>
      )}
      <ul className="flex flex-wrap gap-10 justify-center ">
        {products.map((product) => {
          return (
            <li
              key={product._id}
              className="bg-white rounded-lg overflow-hidden shadow-md w-80"
            >
              <img
                src={"https://via.placeholder.com/300x200"}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <H five className="text-left">
                  {product.name}
                </H>
                <p className="text-gray-700">${product.price}</p>
                <p className="text-gray-600">
                  Category: <span className="">{product.category}</span>
                </p>
                <p className="text-gray-600">In Stock: {product.quantity}</p>

                <Button view>
                  <Link to={`/products/${product._id}`}>View Product</Link>
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProductsPage;
