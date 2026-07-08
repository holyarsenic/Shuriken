import { useState, useContext, createContext, useCallback } from "react";
import axios from "axios";

const ChannelContext = createContext();

export const ChannelProvider = ({ children }) => {

  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchChannelId = useCallback(async (channelUsername, showLoading = true) => {

      if (showLoading) {
        setLoading(true);
      }

      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/users/c/${channelUsername}`,
          {
            withCredentials: true
          }
        );

        setChannel(res.data.data);

      } catch(error) {
        console.log(error);
        setChannel(null);

      } finally {
        if (showLoading) {
          setLoading(false);
        }
      }

    }, []);



  const toggleFollow = async (channelId) => {
    try {
      await axios.post(
        `http://localhost:8000/api/v1/follows/c/${channelId}`,
        {},
        {
          withCredentials: true
        }
      );

      await fetchChannelId(channel.userName, false);

    } catch(error) {
      console.log(error);
    }
  };


  return (
    <ChannelContext.Provider
      value={{
        loading,
        fetchChannelId,
        toggleFollow,
        channel
      }}
    >
      {children}
    </ChannelContext.Provider>
  );

};


export const ChannelData = () => useContext(ChannelContext);