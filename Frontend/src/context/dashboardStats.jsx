import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const DashboardContext = createContext();

export const DashboardProvider = ({children}) => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [dashboardPosts,setDashboardPosts] = useState([]);
  const [statsLoading, setStatsLoading] = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);

  const fetchDashboardStats = useCallback(async () => {
    setStatsLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/dashboard/stats`,
        {
          withCredentials: true,
        }
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
      const res = await axios.get(
        `http://localhost:8000/api/v1/dashboard/Post`,
        {
          withCredentials: true,
        }
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