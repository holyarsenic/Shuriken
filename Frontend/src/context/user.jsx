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

      setLoading(true)

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

    setLoading(true);

    try {
      await axios.post(
      "http://localhost:8000/api/v1/users/logout",
      {},
      {
        withCredentials: true,
      }
    );

    setUser(null);
    navigate("/login");
    } catch (error) {
       console.log(error.message)
    }  finally {
        setLoading(false);
      }
  };

  const changePassword = async (
    oldPassword,
    newPassword,
    confirmNewPassword
  ) => {
    const res = await axios.post(
      "http://localhost:8000/api/v1/users/change-password",
      {
        oldPassword,
        newPassword,
        confirmNewPassword,
      },
      {
        withCredentials: true,
      }
    );

    return res.data;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logOut,
        changePassword
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const User = () => useContext(UserContext);