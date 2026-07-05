import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/posts",
        {
          withCredentials: true,
        }
      );

      setPosts(res.data.data.posts);
    } catch (error) {
      console.log(error.response?.data || error.message);
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