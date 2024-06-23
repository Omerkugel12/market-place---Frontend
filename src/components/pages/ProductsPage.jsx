import React, { useEffect, useState } from "react";
import axios from "axios";

const PRODUCTS_URL = "http://localhost:3000/api/product";

function ProductsPage() {
  const [products, setProducts] = useState([]);

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
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => {
          return <li key={product._id}>{product.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default ProductsPage;
