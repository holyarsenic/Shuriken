import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";


const FollowListContext = createContext();


export const FollowListProvider = ({ children }) => {

  const [followersData, setFollowersData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
 

  const fetchFollowers = useCallback(async(userId)=>{
    try {

      const res = await axios.get(
        `http://localhost:8000/api/v1/follows/c/${userId}`,
        {
          withCredentials:true,
        }
      );

      setFollowersData(res.data.data)
    } catch(error){
      console.log(error.message);

      setFollowersData([])
    } 
  },[]);

  
  const fetchFollowing = useCallback(async(userId)=>{
    try {

      const res = await axios.get(
        `http://localhost:8000/api/v1/follows/u/${userId}`,
        {
          withCredentials:true,
        }
      );
      
      setFollowingData(res.data.data)
    } catch(error){
      console.log(error.message);

      setFollowingData([])
    }
  },[]);

   const toggleFollowFromList = async (channelId) => {
    try {
      await axios.post(
        `http://localhost:8000/api/v1/follows/c/${channelId}`,
        {},
        {
          withCredentials: true
        }
      );

    } catch(error) {
      console.log(error);
    }
  };


  return (

    <FollowListContext.Provider
      value={{
        fetchFollowers,
        fetchFollowing,
        followersData,
        followingData,
        toggleFollowFromList
      }}
    >

      {children}

    </FollowListContext.Provider>

  );

};



export const FollowList = () => useContext(FollowListContext);