import { createContext, useContext, useState, useCallback } from "react";
import api from "../api/axios";

const DashboardContext = createContext();

export const DashboardProvider = ({children}) => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [dashboardPosts,setDashboardPosts] = useState([]);
  const [statsLoading, setStatsLoading] = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);

  const fetchDashboardStats = useCallback(async () => {
    setStatsLoading(true);

    try {
      const res = await api.get(
        `/dashboard/stats`
      );

      setDashboardStats(res.data.data);
    } catch (error) {
      console.log(error.message);
      setDashboardStats(null);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const fetchPostDashboard = useCallback(async () => {
    setPostsLoading(true);

    try {
      const res = await api.get(
        `/dashboard/Post`
      );

      setDashboardPosts(res.data.data);
    } catch (error) {
      console.log(error.message);
      setDashboardPosts(null);
    } finally {
      setPostsLoading(false);
    }
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        dashboardStats,
        statsLoading,
        postsLoading,
        fetchDashboardStats,
        fetchPostDashboard,
        dashboardPosts
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const DashboardPage = () => useContext(DashboardContext);