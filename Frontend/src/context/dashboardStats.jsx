import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardStats = useCallback(async () => {
    setLoading(true);

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
      setLoading(false);
    }
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        dashboardStats,
        loading,
        fetchDashboardStats,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const DashboardPage = () => useContext(DashboardContext);