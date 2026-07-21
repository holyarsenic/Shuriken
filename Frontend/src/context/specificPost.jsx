import { createContext, useContext, useState , useCallback} from "react";
import api from "../api/axios";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

        const fetchPostById = useCallback(async (postId, showLoading = true ) => {
          
          if (showLoading) {
            setLoading(true);
          }

          try {
            const res = await api.get(
              `/posts/${postId}`
            );

            setPost(res.data.data);
          } catch (error) {
             if (error.response?.status !== 401) {
              console.error(error.message);
            }
            setPost(null);
          } finally {
            if (showLoading) {
              setLoading(false);
            }
          }
        },[]);

        const toggleLike = async (postId) => {
        try {
          const res = await api.post(
            `/likes/toggle/v/${postId}`,
            {}
          );

          const { isLiked } = res.data.data;

          setPost((prev) => ({
            ...prev,
            isLiked,
            likes: isLiked ? prev.likes + 1 : prev.likes - 1
          }));

            if(isLiked){
             setAnimate(true);

            setTimeout(() => {
              setAnimate(false);
            }, 400);
            }

        } catch (err) {
          console.log(err.response?.data || err.message);
        }
      };

  return (
    <PostContext.Provider
      value={{ post, loading, fetchPostById, toggleLike, animate }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const Post = () => useContext(PostContext);