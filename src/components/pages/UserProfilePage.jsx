import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function ProfilePage() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">{user.username}</h1>
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
      </div>
    </div>
  );
}

export default ProfilePage;
