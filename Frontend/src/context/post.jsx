import { createContext, useContext, useState } from "react";
import axios from "axios";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPostById = async (postId) => {
    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/posts/${postId}`,
        { withCredentials: true }
      );

      setPost(res.data.data);
    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

    const toggleLike = async (postId) => {
    try {
      await axios.post(
        `http://localhost:8000/api/v1/likes/toggle/post/${postId}`,
        {},
        { withCredentials: true }
      );

      setPost((prev) => {
        if (!prev) return prev;

        const isLiked = prev.isLiked;

        return {
          ...prev,
          isLiked: !isLiked,
          likes: isLiked ? prev.likes - 1 : prev.likes + 1,
        };
      });

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <PostContext.Provider
      value={{ post, loading, fetchPostById, toggleLike }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const Post = () => useContext(PostContext);