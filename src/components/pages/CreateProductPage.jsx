import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { PRODUCT_BASE_URL } from "../../constansts/url.constant";
import H from "../../UI/H";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
function CreateProductPage() {
  const [products, setProducts] = useOutletContext();
  const [selectedCategory, setSelectedCategory] = useState("");
  const newProductNameInputRef = useRef(null);
  const newProductPriceInputRef = useRef(null);
  const newProductQuantityInputRef = useRef(null);
  const navigate = useNavigate();

  function handleCategoryChange(ev) {
    setSelectedCategory(ev.target.value);
  }

  async function addProduct(ev) {
    ev.preventDefault();
    const newProduct = {
      name: newProductNameInputRef.current.value,
      price: newProductPriceInputRef.current.value,
      quantity: newProductQuantityInputRef.current.value,
      category: selectedCategory,
    };
    try {
      const { data: newProductPosted } = await axios.post(
        PRODUCT_BASE_URL,
        newProduct
      );
      console.log("product added successfuly");
      setProducts((prevProducts) => {
        return [...prevProducts, newProductPosted];
      });
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <form
          onSubmit={addProduct}
          className="flex flex-col space-y-6 mt-6 shadow-2xl p-14"
        >
          <H one>Add Product</H>
          <Input
            register
            type="text"
            ref={newProductNameInputRef}
            placeholder="Enter product name..."
            required
          />
          <Input
            register
            type="number"
            ref={newProductPriceInputRef}
            placeholder="Enter product price..."
            required
          />
          <Input
            register
            type="number"
            ref={newProductQuantityInputRef}
            placeholder="Enter product uantity..."
            required
          />
          <select
            className="border-2 p-1 rounded-r-3xl focus:border-indigo-900"
            value={selectedCategory}
            onChange={handleCategoryChange}
            required
          >
            <option value="none">Select category</option>
            <option value="Accessories">Accessories</option>
            <option value="HomeAppliances">Home Appliances</option>
            <option value="Electronics">Electronics</option>
            <option value="SmartHome">Smart Home</option>
            <option value="Automotive">Automotive</option>
            <option value="Wearables">Wearables</option>
            <option value="Health">Health</option>
          </select>
          <Button shop type="submit">
            Add product
          </Button>
        </form>
      </div>
    </>
  );
}

export default CreateProductPage;
