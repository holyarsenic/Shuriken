import { createContext, useContext, useState, useCallback } from "react";
import api from "../api/axios";


const FollowListContext = createContext();


export const FollowListProvider = ({ children }) => {

  const [followersData, setFollowersData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
 

  const fetchFollowers = useCallback(async(userId)=>{
    try {

      const res = await api.get(
        `/follows/c/${userId}`
      );

      setFollowersData(res.data.data)
    } catch(error){
      console.log(error.message);

      setFollowersData([])
    } 
  },[]);

  
  const fetchFollowing = useCallback(async(userId)=>{
    try {

      const res = await api.get(
        `/follows/u/${userId}`,
      );
      
      setFollowingData(res.data.data)
    } catch(error){
      console.log(error.message);

      setFollowingData([])
    }
  },[]);

   const toggleFollowFromList = async (channelId) => {
    try {
      await api.post(
        `/follows/c/${channelId}`,
        {}
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