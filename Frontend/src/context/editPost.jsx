import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";


const EditPostContext = createContext();


export const EditPostProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);



  const deletePost = useCallback(async(postId)=>{

    setLoading(true);

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

      setLoading(false);

    }

  },[]);



  return (

    <EditPostContext.Provider
      value={{
        deletePost,
        loading
      }}
    >

      {children}

    </EditPostContext.Provider>

  );

};



export const EditPost = () => useContext(EditPostContext);