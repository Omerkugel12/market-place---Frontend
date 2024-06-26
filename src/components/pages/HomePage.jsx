import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="hero-section bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Discover Your Style
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Explore our curated collection of fashion and accessories.
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
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="/images/product1.jpg"
                alt="Product 1"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Elegant Dress
                </h3>
                <p className="text-gray-700 mb-2">$89.99</p>
                <Link
                  to="/products/1"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-full inline-block hover:bg-indigo-700"
                >
                  View Details
                </Link>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="/images/product2.jpg"
                alt="Product 2"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Stylish Sunglasses
                </h3>
                <p className="text-gray-700 mb-2">$49.99</p>
                <Link
                  to="/products/2"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-full inline-block hover:bg-indigo-700"
                >
                  View Details
                </Link>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="/images/product3.jpg"
                alt="Product 3"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Leather Handbag
                </h3>
                <p className="text-gray-700 mb-2">$129.99</p>
                <Link
                  to="/products/3"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-full inline-block hover:bg-indigo-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
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
