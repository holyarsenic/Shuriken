import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const LikedPostContext = createContext();

export const LikedPostProvider = ({ children }) => {
  const [likedPosts, setLikedPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLikedPosts = useCallback(async (channelId) => {
    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/likes/likedposts/${channelId}`,
        {
          withCredentials: true,
        }
      );

      setLikedPosts(res.data.data);
      console.log(res.data.data)
    } catch (error) {
      console.log(error.message);
      setLikedPosts(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <LikedPostContext.Provider
      value={{
        likedPosts,
        loading,
        fetchLikedPosts,
      }}
    >
      {children}
    </LikedPostContext.Provider>
  );
};

export const LikedPostPage = () => useContext(LikedPostContext);