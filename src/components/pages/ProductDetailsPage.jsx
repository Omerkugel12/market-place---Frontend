import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";

const PRODUCTS_URL = "http://localhost:3000/api/product";

function ProductDetailsPage() {
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const [products, setProducts] = useOutletContext();
  const navigate = useNavigate();

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
      navigate("/products", { replace: true });
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
        <button>Edit</button>
      </div>
    </>
  );
}

export default ProductDetailsPage;
