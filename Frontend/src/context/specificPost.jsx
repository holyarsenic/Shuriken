import { createContext, useContext, useState , useCallback} from "react";
import axios from "axios";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

        const fetchPostById = useCallback(async (postId) => {
          setLoading(true);

          try {
            const res = await axios.get(
              `http://localhost:8000/api/v1/posts/${postId}`,
              { withCredentials: true }
            );

            setPost(res.data.data);
          } catch (error) {
            console.log(error.message);
            setPost(null);
          } finally {
            setLoading(false);
          }
        },[]);

        const toggleLike = async (postId) => {
        try {
          const res = await axios.post(
            `http://localhost:8000/api/v1/likes/toggle/v/${postId}`,
            {},
            { withCredentials: true } 
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