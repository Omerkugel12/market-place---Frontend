import React from "react";
import { Link } from "react-router-dom";
import Button from "../../UI/Button";
import H from "../../UI/H";

const HomePage = () => {
  const products = [
    {
      id: "667be3e697f64fcd16ef3315",
      name: "Wireless Headphones",
      price: 99.99,
      quantity: 150,
      category: "Electronics",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: "667be3e697f64fcd16ef3316",
      name: "Smartphone",
      price: 599.99,
      quantity: 75,
      category: "Electronics",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: "667be3e697f64fcd16ef3317",
      name: "Laptop",
      price: 1299.99,
      quantity: 50,
      category: "Electronics",
      image: "https://via.placeholder.com/300x200",
    },
  ];
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="hero-section bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
          <H one>Discover Our Amazing Market</H>
          <p className="text-lg text-gray-700 mb-8">
            Explore our curated collection of products.
          </p>
          <Button shop>
            <Link to="/products">Shop Now</Link>
          </Button>
        </div>
      </section>
      <section className="featured-section py-16">
        <H two>Best Sellers</H>
        <div className="flex w-[100%] justify-evenly flex-wrap sm:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <H five className="text-left">
                  {product.name}
                </H>
                <p className="text-gray-700">${product.price}</p>
                <p className="text-gray-600">Category: {product.category}</p>
                <p className="text-gray-600">In Stock: {product.quantity}</p>
                <Link to={`/products/${product.id}`}>
                  <Button view>View Product</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section bg-gray-200 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <H three>Join Our Newsletter</H>
          <p className="text-lg text-gray-700 mb-8">
            Subscribe to get updates on our latest products and promotions.
          </p>
          <form className="flex items-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email..."
              className="border border-gray-300 p-3 rounded-l-full w-full focus:outline-none"
            />
            <Button className="  px-6 py-3 rounded-r-full font-semibold transition duration-300 hover:bg-indigo-700">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
