import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/users/current-user",
          {
            withCredentials: true,
          }
        );

        setUser(res.data.data);
      } catch (error) {
        console.log(error)
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(
      "http://localhost:8000/api/v1/users/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
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
        password,
      },
      {
        withCredentials: true,
      }
    );

    return res.data;
  };

  const logOut = async () => {
    await axios.post(
      "http://localhost:8000/api/v1/users/logout",
      {},
      {
        withCredentials: true,
      }
    );

    setUser(null);
    navigate("/login");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const User = () => useContext(UserContext);