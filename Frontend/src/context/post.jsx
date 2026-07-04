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
          const res = await axios.post(
            `http://localhost:8000/api/v1/likes/toggle/v/${postId}`,
            {},
            { withCredentials: true } 
          );

          const { isLiked } = res.data.data;

          setPost((prev) => {
            if (!prev) return prev;

            return {
              ...prev,
              isLiked
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