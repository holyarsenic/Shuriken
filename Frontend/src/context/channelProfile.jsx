import { useState, useContext, createContext, useCallback } from "react";
import api from "../api/axios";

const ChannelContext = createContext();

export const ChannelProvider = ({ children }) => {

  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchChannelId = useCallback(async (channelUsername, showLoading = true) => {

      if (showLoading) {
        setLoading(true);
      }

      try {
        const res = await api.get(
          `/users/c/${channelUsername}`
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
      await api.post(
        `/follows/c/${channelId}`,
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