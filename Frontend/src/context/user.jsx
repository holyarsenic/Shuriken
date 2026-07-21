import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {

      setLoading(true)

      try {
        const res = await api.get(
          "/users/current-user",
        );

        setUser(res.data.data);
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error(error);
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  const login = async (email, password) => {
    setLoginLoading(true);

    try {
      const res = await api.post("/users/login", {
        email,
        password,
      });

      setUser(res.data.data.user);
      return res.data;
    } finally {
      setLoginLoading(false);
    }
  };

  const register = async (fullName, userName, email, password) => {
    setRegisterLoading(true);

    try{
      const res = await api.post(
        "/users/register",
        {
          fullName,
          userName,
          email,
          password,
        }
      );
      setUser(res.data)
      return res.data
    }
    finally{
      setRegisterLoading(false)
    }
  };

  const logOut = async () => {

    setLoading(true);

    try {
      await api.post(
      "/users/logout",
      {}
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
    const res = await api.post(
      "/users/change-password",
      {
        oldPassword,
        newPassword,
        confirmNewPassword,
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
        loginLoading,
        register,
        registerLoading,
        logOut,
        changePassword
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const User = () => useContext(UserContext);