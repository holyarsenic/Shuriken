import { Routes, Route } from "react-router-dom";
import Layout from "./layout/NavbarLayout";
import ProtectedRoute from "./layout/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import History from "./pages/History";
import Create from "./pages/Create";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import PostDetails from "./pages/PostDetails";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/create" element={<Create />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/post/:postId" element={<PostDetails />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;