import { Navigate, Outlet } from "react-router-dom";
import { User } from "../context/user";

const ProtectedRoute = () => {
  const { user, loading } = User();

     if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0B0A10]">
        <div className="flex">
          <span className="w-7 h-7 lg:w-10 lg:h-10 rounded-full border-2 lg:border-4 border-slate-300 dark:border-slate-600 border-t-violet-500 dark:border-t-violet-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;