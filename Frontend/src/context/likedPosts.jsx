import { createContext, useContext, useState, useCallback } from "react";
import api from "../api/axios";

const LikedPostContext = createContext();

export const LikedPostProvider = ({ children }) => {
  const [likedPosts, setLikedPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLikedPosts = useCallback(async (channelId) => {
    setLoading(true);

    try {
      const res = await api.get(
        `/likes/likedposts/${channelId}`,
      );

      setLikedPosts(res.data.data);
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