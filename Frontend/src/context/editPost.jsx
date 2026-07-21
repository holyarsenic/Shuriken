import { createContext, useContext, useState, useCallback } from "react";
import api from "../api/axios";


const EditPostContext = createContext();


export const EditPostProvider = ({ children }) => {

  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);



  const deletePost = useCallback(async(postId)=>{

    setDeleting(true);

    try {

      await api.delete(
        `/posts/${postId}`
      );


      return true;


    } catch(error){

      console.log(error.message);

      return false;


    } finally {

      setDeleting(false);

    }

  },[]);

  const editPost = useCallback(async(postId, title, description)=>{
    setEditing(true);
    try {

      await api.patch(
        `/posts/${postId}`,
        {
        title,
        description,
      }
      );

      return true;
    } catch(error){
      console.log(error.message);

      return false
    } finally {
      setEditing(false);
    }

  },[]);



  return (

    <EditPostContext.Provider
      value={{
        deletePost,
        deleting,
        editPost,
        editing
      }}
    >

      {children}

    </EditPostContext.Provider>

  );

};



export const EditPost = () => useContext(EditPostContext);