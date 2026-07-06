import { Navigate, Outlet } from "react-router-dom";
import { User } from "../context/user";

const ProtectedRoute = () => {
  const { user, loading } = User();

   if (loading) {
    return (
      <div className="min-h-screen ml-64 mt-20 flex items-center justify-center bg-[#0B0A10]">
        <div className="flex">
          <span className="w-10 h-10 rounded-full border-4 border-slate-600 border-t-violet-500 animate-spin" />
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