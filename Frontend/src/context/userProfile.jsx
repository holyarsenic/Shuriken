import { createContext,useContext,useState,useCallback } from "react";
import axios from "axios";

const ProfileContext = createContext();

export const ProfileProvider =({ children })=>{
 
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = useCallback(async()=>{
    setLoading(true)
  try {
    const res = await axios.get("http://localhost:8000/api/v1/users/my-profile",
      {
        withCredentials: true,
      }
    )
    setProfile(res.data.data)
  } catch (error) {
    console.log(error.message)
    setProfile(null);
  } finally{
    setLoading(false)
  }

},[])
  return (
    <ProfileContext.Provider
      value={{
        fetchProfile, profile, loading
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export const ProfileData = () => useContext(ProfileContext);