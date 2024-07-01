import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { PRODUCT_BASE_URL } from "../../constansts/url.constant";
import H from "../../UI/H";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { X } from "lucide-react";
import Modal from "../../UI/Modal";
import { UserContext } from "../../contexts/UserContext";

function CreateProductPage() {
  const [products, setProducts] = useOutletContext();
  const [selectedCategory, setSelectedCategory] = useState("");
  const newProductNameInputRef = useRef(null);
  const newProductPriceInputRef = useRef(null);
  const newProductQuantityInputRef = useRef(null);
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const { user } = useContext(UserContext);
  const { userProducts, setUserProducts } = useContext(UserContext);

  function handleCategoryChange(ev) {
    setSelectedCategory(ev.target.value);
  }

  async function addProduct(ev) {
    ev.preventDefault();
    const newProduct = {
      name: newProductNameInputRef.current.value,
      price: newProductPriceInputRef.current.value,
      categories: selectedCategory,
      quantity: newProductQuantityInputRef.current.value,
      user: user._id,
    };
    try {
      const { data: newProductPosted } = await axios.post(
        PRODUCT_BASE_URL,
        newProduct
      );
      // console.log(userProducts);
      // setUserProducts((prevUserProducts) => {
      //   return [...prevUserProducts, newProductPosted];
      // });
      // console.log(userProducts);
      setProducts((prevProducts) => {
        return [...prevProducts, newProductPosted];
      });
      setTimeout(() => {
        navigate("/products");
      }, 3000);
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  }

  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-0 bg-slate-700 opacity-80">
        {isSuccess ? <Modal success>Product added successfully!</Modal> : null}
        {isError ? <Modal error>Error adding product!</Modal> : null}
      </div>
      <div className="fixed flex justify-center items-center top-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2 z-50 bg-white">
        <Button
          danger
          className="absolute bg-inherit size-1 top-0 left-0 rounded-md"
          onClick={() => navigate("/products")}
        >
          <X color="#ff0000" strokeWidth={1.75} />
        </Button>
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
            placeholder="Enter product quantity..."
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
