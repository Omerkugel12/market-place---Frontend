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
import { Eye, Filter, Plus, Search, X } from "lucide-react";
import Input from "../../UI/Input.jsx";

function ProductsPage() {
  const [products, setProducts] = useOutletContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpeningFilter, setIsOpeningFilter] = useState(false);

  useEffect(() => {
    async function getProducts() {
      const page = searchParams.get("page");
      if (page < 1) searchParams.set("page", 1);
      setSearchParams(searchParams);

      const options = {
        params: {
          name: searchParams.get("name"),
          category: searchParams.get("category"),
          minPrice: searchParams.get("minPrice"),
          maxPrice: searchParams.get("maxPrice"),
          page: page,
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
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  function handlePagination(ev) {
    const value = ev.target.value;
    searchParams.set("page", value);
    setSearchParams(searchParams);
  }

  return (
    <>
      <div className="flex justify-center items-center">
        {isOpeningFilter && (
          <form
            onSubmit={handleFilterSubmit}
            className="mt-[400px] fixed bg-slate-700 p-6 space-y-6 rounded-md flex flex-col z-50 text-center"
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
            <Button className="flex items-center justify-center gap-2">
              Apply filters
              <Filter size={15} color="#fff" strokeWidth={1.5} />
            </Button>
          </form>
        )}
      </div>
      <div
        className={`${isOpeningFilter ? " opacity-10 " : ""} relative px-5 pt-4 pb-6 flex flex-col items-center`}
      >
        <H one>Products</H>

        <Button
          view
          className="flex flex-row items-center justify-center gap-2 absolute left-6"
          onClick={() => setIsOpeningFilter(true)}
        >
          Filters
          <Filter size={20} color="#fff" strokeWidth={1.5} />
        </Button>
        <Button
          view
          className="absolute right-6 flex items-center justify-center gap-2"
          onClick={() => navigate("create", { replace: true })}
        >
          Add product <Plus size={20} color="#fff" strokeWidth={1.5} />
        </Button>
        <div className="flex items-center my-6">
          <form onSubmit={handleFilterSubmit} className="flex">
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
        <div className="my-4">
          <Input
            className="w-12 border-gray-300 p-3"
            min={1}
            id="page"
            name="page"
            type="number"
            value={searchParams.get("page") || "1"}
            onChange={handlePagination}
          />
        </div>
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

                  <Button
                    view
                    className="flex items-center justify-center gap-2"
                  >
                    <Link
                      to={`/products/${product._id}`}
                      className="flex items-center justify-center gap-2"
                    >
                      View Product{" "}
                      <Eye size={20} color="#fff" strokeWidth={1.5} />
                    </Link>
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default ProductsPage;
