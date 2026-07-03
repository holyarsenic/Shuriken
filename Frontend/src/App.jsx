import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/navbarLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import History from "./pages/History";
import Create from "./pages/Create";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import PostDetails from "./pages/PostDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/create" element={<Create />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/post/:postId" element={<PostDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;