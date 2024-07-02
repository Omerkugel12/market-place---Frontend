import axios from "axios";
import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import { PRODUCT_BASE_URL } from "../../constansts/url.constant";
import H from "../../UI/H";
import Button from "../../UI/Button";
import Paragraph from "../../UI/Paragraph";
import { Trash2, Pencil, X } from "lucide-react";
import Modal from "../../UI/Modal";
import { UserContext } from "../../contexts/UserContext";

function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const [products, setProducts] = useOutletContext();
  const navigate = useNavigate();
  const [isOpeningModal, setIsOpeningModal] = useState(false);
  const updatedProductNameInputRef = useRef(null);
  const updatedProductPriceInputRef = useRef(null);
  const updatedProductQuantityInputRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [errorToDelete, setErrorToDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [errorToEdit, setErrorToEdit] = useState(false);
  const { user } = useContext(UserContext);

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
      const token = localStorage.getItem("token");
      await axios.delete(`${PRODUCT_BASE_URL}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prevProducts) => {
        return prevProducts.filter((product) => product._id !== productId);
      });

      setTimeout(() => {
        navigate("/products");
      }, 2000);
      setIsDelete(true);
    } catch (error) {
      console.log(error);
      setErrorToDelete(true);
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
      categories: selectedCategory,
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
      setIsEdit(true);
    } catch (error) {
      console.log(error);
      setErrorToEdit(true);
    }
  }

  return (
    <>
      {isOpeningModal && (
        <>
          <div className="fixed top-0 bottom-0 right-0 left-0 bg-slate-800 opacity-60">
            {isEdit ? (
              <Modal success>Product edited successfully!</Modal>
            ) : null}
            {errorToEdit ? <Modal error>Error editing product!</Modal> : null}
          </div>
          <div className="flex items-center justify-center">
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
              <Button
                edit
                onClick={() =>
                  setTimeout(() => {
                    setIsOpeningModal(false);
                  }, 3000)
                }
                className="flex items-center justify-center gap-2"
              >
                Edit <Pencil size={20} color="#fff" strokeWidth={1.5} />
              </Button>
            </form>
          </div>
        </>
      )}
      <div
        className={` relative my-4 mx-4 px-5 pt-4 pb-6 shadow-2xl max-w-3xl`}
      >
        <H one> {product.name}</H>
        <div className="text-left space-y-5 mt-16">
          <img
            src="https://via.placeholder.com/300x200"
            alt={product.name}
            className={`${isOpeningModal ? "opacity-60" : ""}`}
          />
          <Paragraph>{product.price} $</Paragraph>
          <Paragraph>{product.categories.join(", ")}</Paragraph>
          <Paragraph>In stock: {product.quantity}</Paragraph>
          {user && product.user === user._id && (
            <div className="flex gap-6 justify-end">
              <Button deleting onClick={() => removeProduct(product._id)}>
                <Trash2 size={20} color="#fff" strokeWidth={1.5} />
              </Button>
              <Button edit onClick={() => setIsOpeningModal(true)}>
                <Pencil size={20} color="#fff" strokeWidth={1.5} />
              </Button>
            </div>
          )}
        </div>
        {isDelete ? <Modal success>Product deleted successfully!</Modal> : null}
        {errorToDelete ? <Modal error>Error deleting product!</Modal> : null}
      </div>
    </>
  );
}

export default ProductDetailsPage;
