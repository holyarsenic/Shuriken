import { useState, createContext, useContext, useCallback } from "react";
import axios from "axios";

const CommentsContext = createContext();

export const CommentsProvider = ({children}) => {

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const  fetchComments = useCallback(async(postId) => {

    setLoading(true)

    try {
      const res = await axios.get(`http://localhost:8000/api/v1/comments/${postId}`,
        {
        withCredentials: true,
        }
      );

      setComments(res.data.data.docs)

      console.log(res.data.data)
    } catch (error) {
      console.log(error.message);
      setComments([])
    } finally {
      setLoading(false);
    }
  }, [])

   const addComment = async (postId, content) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/comments/${postId}`,
        {
          content,
        },
        {
          withCredentials: true,
        }
      );

      setComments((prev) => [
         ...prev,
        res.data.data
      ]);

    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <CommentsContext.Provider 
    value={{ loading, comments, fetchComments, addComment }}>
      {children}
    </CommentsContext.Provider>
  )
}

export const UseComments = () =>useContext(CommentsContext)