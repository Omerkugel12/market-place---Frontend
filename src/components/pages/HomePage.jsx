import React from "react";
import { Link } from "react-router-dom";

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
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Discover Our Amazing Market
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Explore our curated collection of products.
          </p>
          <Link
            to="/products"
            className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold transition duration-300 hover:bg-indigo-700"
          >
            Shop Now
          </Link>
        </div>
      </section>
      <section className="featured-section py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Best Sellers
        </h1>
        <div className="flex w-[100%] justify-evenly flex-wrap sm:gap-8 sm">
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
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700">${product.price}</p>
                <p className="text-gray-600">Category: {product.category}</p>
                <p className="text-gray-600">In Stock: {product.quantity}</p>
                <Link to={`/products/${product.id}`}>
                  <button className="mt-4 inline-block bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition duration-300">
                    View Product
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section bg-gray-200 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Subscribe to get updates on our latest products and promotions.
          </p>
          <form className="flex items-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email..."
              className="border border-gray-300 p-3 rounded-l-full w-full focus:outline-none"
            />
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-r-full font-semibold transition duration-300 hover:bg-indigo-700">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
