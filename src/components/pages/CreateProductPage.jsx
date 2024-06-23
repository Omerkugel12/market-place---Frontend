import React from "react";

function CreateProductPage() {
  return (
    <>
      <h1>Add Product</h1>
      <form action="submit">
        <input type="text" placeholder="Enter product name..." />
        <input type="text" placeholder="Enter product price..." />
        <select name="" id="">
          <option>Select category</option>
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
