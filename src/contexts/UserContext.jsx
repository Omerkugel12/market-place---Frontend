import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";
import { formatJWTTokenToUser } from "../utils/utils";
import { USER_BASE_URL } from "../constansts/url.constant";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  async function getUserById(id) {
    try {
      const res = await axios.get(`${USER_BASE_URL}/${id}`);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return;
    }
    const { userId } = formatJWTTokenToUser(token);
    getUserById(userId);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
