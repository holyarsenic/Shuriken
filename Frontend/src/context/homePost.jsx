import { createContext, useContext, useState, useCallback } from "react";
import api from "../api/axios";

const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);

    try {
      const res = await api.get(
        "/posts"
      );

      setPosts(res.data.data);
    } catch (error) {
       if (error.response?.status !== 401) {
        console.error(error.message);
      }
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <HomeContext.Provider
      value={{
        posts,
        loading,
        fetchPosts,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const HomePage = () => useContext(HomeContext);