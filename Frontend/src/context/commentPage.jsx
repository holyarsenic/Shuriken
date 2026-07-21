import { useState, createContext, useContext, useCallback } from "react";
import api from "../api/axios";

const CommentsContext = createContext();

export const CommentsProvider = ({children}) => {

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const  fetchComments = useCallback(async(postId) => {

    setLoading(true)

    try {
      const res = await api.get(`/comments/${postId}`
      );

      setComments(res.data.data.docs)
    } catch (error) {
      console.log(error.message);
      setComments([])
    } finally {
      setLoading(false);
    }
  }, [])

   const addComment = async (postId, content) => {
    try {
      const res = await api.post(
        `/comments/${postId}`,
        {
          content,
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

  const deleteComment = async (commentId) => {
  try {
    await api.delete(
      `/comments/c/${commentId}`
    );
  } catch (err) {
    console.log(err);
  }
};

  return (
    <CommentsContext.Provider 
    value={{ loading, comments, fetchComments, addComment, deleteComment }}>
      {children}
    </CommentsContext.Provider>
  )
}

export const UseComments = () =>useContext(CommentsContext)