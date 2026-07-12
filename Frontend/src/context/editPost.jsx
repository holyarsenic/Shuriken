import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";


const EditPostContext = createContext();


export const EditPostProvider = ({ children }) => {

  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);



  const deletePost = useCallback(async(postId)=>{

    setDeleting(true);

    try {

      await axios.delete(
        `http://localhost:8000/api/v1/posts/${postId}`,
        {
          withCredentials:true
        }
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

      await axios.patch(
        `http://localhost:8000/api/v1/posts/${postId}`,
        {
        title,
        description,
      },
        {
          withCredentials:true,
        }
      );
    } catch(error){
      console.log(error.message);
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