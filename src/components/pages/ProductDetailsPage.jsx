import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";

const PRODUCTS_URL = "http://localhost:3000/api/product";

function ProductDetailsPage() {
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const [products, setProducts] = useOutletContext();
  const navigate = useNavigate();
  const [isOpeningModal, setIsOpeningModal] = useState(null);
  const updatedProductNameInputRef = useRef(null);
  const updatedProductPriceInputRef = useRef(null);
  const updatedProductQuantityInputRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  function handleCategoryChange(e) {
    setSelectedCategory(e.target.value);
  }

  useEffect(() => {
    async function getProduct() {
      try {
        const { data } = await axios.get(`${PRODUCTS_URL}/${productId}`);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    }
    getProduct();
  }, []);

  async function removeProduct(productId) {
    try {
      await axios.delete(`${PRODUCTS_URL}/${productId}`);
      setProducts((prevProducts) => {
        return prevProducts.filter((product) => product._id !== productId);
      });
      console.log("deleting");
      // navigate("/products");
    } catch (error) {
      console.log(error);
    }
  }

  async function editProduct(productId) {
    const updatedProduct = {
      _id: productId,
      name: updatedProductNameInputRef.current.value,
      price: updatedProductPriceInputRef.current.value,
      quantity: updatedProductQuantityInputRef.current.value,
      category: selectedCategory,
    };
    try {
      const { data: updatedProductPutted } = await axios.put(
        `${PRODUCTS_URL}/${productId}`,
        updatedProduct
      );
      setProduct(updatedProductPutted);
      setProducts((prevProducts) => {
        return prevProducts.map((product) =>
          product._id === productId ? updatedProductPutted : product
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <h1>Product details: {product.name}</h1>
      <div>
        <p>{product.name}</p>
        <p>{product.price} $</p>
        <p>{product.category}</p>
        <button onClick={() => removeProduct(product._id)}>Delete</button>
        <button onClick={() => setIsOpeningModal(true)}>Edit</button>
        {isOpeningModal ? (
          <form onSubmit={() => editProduct(product._id)}>
            <button onClick={() => setIsOpeningModal(false)}>x</button>
            <input
              type="text"
              ref={updatedProductNameInputRef}
              placeholder="Enter product name..."
              required
            />
            <input
              type="number"
              ref={updatedProductPriceInputRef}
              placeholder="Enter product price..."
              required
            />
            <input
              type="number"
              ref={updatedProductQuantityInputRef}
              placeholder="Enter product quantity..."
              required
            />
            <select
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
            <button>Edit</button>
          </form>
        ) : null}
      </div>
    </>
  );
}

export default ProductDetailsPage;
