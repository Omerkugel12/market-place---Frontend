import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import { PRODUCT_BASE_URL } from "../../constansts/url.constant";
import H from "../../UI/H";
import Button from "../../UI/Button";
import Paragraph from "../../UI/Paragraph";
import { Trash2, Pencil, X } from "lucide-react";

function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
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
        const { data } = await axios.get(`${PRODUCT_BASE_URL}/${productId}`);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    }
    getProduct();
  }, []);

  async function removeProduct(productId) {
    try {
      await axios.delete(`${PRODUCT_BASE_URL}/${productId}`);
      setProducts((prevProducts) => {
        return prevProducts.filter((product) => product._id !== productId);
      });
      console.log("deleting");
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  }

  if (!product) {
    return;
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
        `${PRODUCT_BASE_URL}/${productId}`,
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

  function MainDiv(props) {
    const { children } = props;
    return (
      <div
        className={
          isOpeningModal
            ? "opacity-5 relative my-4 mx-4 px-5 pt-4 pb-6 shadow-2xl max-w-3xl"
            : "relative my-4 mx-4 px-5 pt-4 pb-6 shadow-2xl max-w-3xl"
        }
      >
        {children}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center">
        {isOpeningModal && (
          <form
            onSubmit={() => editProduct(product._id)}
            className="mt-[400px] fixed bg-slate-700 p-6 space-y-6 rounded-md flex flex-col z-50 text-center"
          >
            <Button
              danger
              className="absolute bg-inherit size-1 top-0 left-0 rounded-md"
              onClick={() => {
                setIsOpeningModal(false);
              }}
            >
              <X color="#ff0000" strokeWidth={1.75} />
            </Button>
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
            <Button edit className="flex items-center justify-center gap-2">
              Edit <Pencil size={20} color="#fff" strokeWidth={1.5} />
            </Button>
          </form>
        )}
      </div>
      <div className="relative my-4 mx-4 px-5 pt-4 pb-6 shadow-2xl max-w-3xl">
        <H one> {product.name}</H>
        <div className="text-left space-y-5 mt-16">
          <img src="https://via.placeholder.com/300x200" alt={product.name} />
          <Paragraph>{product.price} $</Paragraph>
          <Paragraph>{product.category}</Paragraph>
          <Paragraph>In stock: {product.quantity}</Paragraph>
          <div className="flex gap-6 justify-end">
            <Button deleting onClick={() => removeProduct(product._id)}>
              <Trash2 size={20} color="#fff" strokeWidth={1.5} />
            </Button>
            <Button edit onClick={() => setIsOpeningModal(true)}>
              <Pencil size={20} color="#fff" strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailsPage;
