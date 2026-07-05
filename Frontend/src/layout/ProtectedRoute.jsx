// components/ProtectedRoute.jsx
import { useNavigate, Outlet } from "react-router-dom";
import { User } from "../context/user.jsx";

const ProtectedRoute = () => {
  const { user } = User();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  }

  return <Outlet />;
};

export default ProtectedRoute;