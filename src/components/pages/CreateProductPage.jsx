import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";

const PRODUCTS_URL = "http://localhost:3000/api/product";

function CreateProductPage() {
  const [products, setProducts] = useOutletContext();
  const [selectedCategory, setSelectedCategory] = useState("");
  const newProductNameInputRef = useRef(null);
  const newProductPriceInputRef = useRef(null);
  const navigate = useNavigate();

  function handleCategoryChange(ev) {
    setSelectedCategory(ev.target.value);
  }

  async function addProduct(ev) {
    ev.preventDefault();
    const newProduct = {
      name: newProductNameInputRef.current.value,
      price: newProductPriceInputRef.current.value,
      category: selectedCategory,
    };
    try {
      const { data: newProductPosted } = await axios.post(
        PRODUCTS_URL,
        newProduct
      );
      console.log("product added successfuly");
      setProducts((prevProducts) => {
        return [...prevProducts, newProductPosted];
      });
      // navigate("/products");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Add Product</h1>
      <form onSubmit={addProduct}>
        <input
          type="text"
          ref={newProductNameInputRef}
          placeholder="Enter product name..."
          required
        />
        <input
          type="number"
          ref={newProductPriceInputRef}
          placeholder="Enter product price..."
          required
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          required
        >
          <option value="none">Select category</option>
          <option value="weapons">weapons</option>
          <option value="furniture">furniture</option>
          <option value="electronics">electronics</option>
        </select>
        <button>Add product</button>
      </form>
    </>
  );
}

export default CreateProductPage;
