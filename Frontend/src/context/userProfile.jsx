import { createContext,useContext,useState,useCallback } from "react";
import api from "../api/axios";

const ProfileContext = createContext();

export const ProfileProvider =({ children })=>{
 
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = useCallback(async(showLoading = true)=>{
    
    if (showLoading) {
        setLoading(true);
      }

  try {
    const res = await api.get("/users/my-profile"
    )
    setProfile(res.data.data)
  } catch (error) {
    console.log(error.message)
    setProfile(null);
  } finally{
    
    if (showLoading) {
          setLoading(false);
        }
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