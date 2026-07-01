import { createContext, useContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await axios.post(
      "http://localhost:8000/api/v1/users/login",
      { email, password },
      { withCredentials: true }
    );

    setUser(res.data.data.user);
    return res.data;
  };

  const register = async (fullName, userName, email, password) => {
     const res = await axios.post(
      "http://localhost:8000/api/v1/users/register",
      {
        fullName,
        userName,
        email,
        password
      },
      { withCredentials: true }
    );

    return res.data;
  };

  const logOut = async () => {
    await axios.post(
      "http://localhost:8000/api/v1/users/logout",
      {},
      { withCredentials: true }
    );

    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logOut, register }}>
      {children}
    </UserContext.Provider>
  );
};

export const User = () => useContext(UserContext);