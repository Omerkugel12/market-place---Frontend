import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import H from "../../UI/H";
import axios from "axios";
import { PRODUCT_BASE_URL } from "../../constansts/url.constant";
import Button from "../../UI/Button";
import { Link, useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

function ProfilePage() {
  const { user } = useContext(UserContext);
  const [userProducts, setUserProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserProducts() {
      if (user && user.products.length > 0) {
        try {
          const productsRequests = user.products.map(
            (productId) => axios.get(`${PRODUCT_BASE_URL}/${productId}`)
            // console.log(productId)
          );
          //   console.log(productId);
          const responses = await Promise.all(productsRequests);
          //   console.log(responses);
          const productsWithData = responses.map((response) => response.data);
          setUserProducts(productsWithData);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getUserProducts();
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  function handleLogOut() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="container mx-auto mt-8">
      <H one className="text-left">
        {user.username}
      </H>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <p>{user.firstName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Last name:
          </label>
          <p>{user.lastName}</p>
        </div>
        <Button deleting onClick={handleLogOut}>
          Log-out
        </Button>
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <H three>My products</H>
        <div>
          {userProducts.length > 0 ? (
            <ul className="flex flex-wrap gap-10 justify-center ">
              {userProducts.map((product) => {
                return (
                  <li
                    key={product._id}
                    className="bg-white rounded-lg overflow-hidden shadow-md w-80"
                  >
                    <img
                      src={"https://via.placeholder.com/300x200"}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <H five className="text-left">
                        {product.name}
                      </H>
                      <p className="text-gray-700">${product.price}</p>
                      <p className="text-gray-600">
                        Category:{" "}
                        <span className="">
                          {product.categories.join(", ")}
                        </span>
                      </p>
                      <p className="text-gray-600">
                        In Stock: {product.quantity}
                      </p>

                      <Button
                        view
                        className="flex items-center justify-center gap-2"
                      >
                        <Link
                          to={`/products/${product._id}`}
                          className="flex items-center justify-center gap-2"
                        >
                          View Product{" "}
                          <Eye size={20} color="#fff" strokeWidth={1.5} />
                        </Link>
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

// import React, { useContext, useEffect, useState } from "react";
// import { UserContext } from "../../contexts/UserContext";
// import H from "../../UI/H";
// import axios from "axios"; // Import axios for making HTTP requests

// function ProfilePage() {
//   const { user } = useContext(UserContext);
//   const [userProducts, setUserProducts] = useState([]);

//   useEffect(() => {
//     async function fetchUserProducts() {
//       if (user && user.products.length > 0) {
//         try {
//           // Create an array of axios requests to fetch each product detail
//           const productRequests = user.products.map((productId) =>
//             axios.get(`/api/products/${productId}`)
//           );

//           // Execute all requests concurrently
//           const responses = await Promise.all(productRequests);

//           // Extract the data from each response
//           const productsWithData = responses.map((response) => response.data);

//           // Update state with fetched product details
//           setUserProducts(productsWithData);
//         } catch (error) {
//           console.error("Error fetching user products:", error);
//         }
//       }
//     }

//     fetchUserProducts();
//   }, [user]); // Fetch products whenever user changes

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto mt-8">
//       <H one className="text-left">
//         {user.username}
//       </H>
//       <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Name:
//           </label>
//           <p>{user.firstName}</p>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Last name:
//           </label>
//           <p>{user.lastName}</p>
//         </div>
//       </div>
//       <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         <H three>My products</H>
//         <div>
//           <ul>
//             {userProducts.map((product) => (
//               <li key={product._id}>
//                 <p>{product.name}</p>
//                 <p>Price: ${product.price}</p>
//                 <p>Quantity: {product.quantity}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProfilePage;
