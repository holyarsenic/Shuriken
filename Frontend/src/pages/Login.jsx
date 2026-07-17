import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../context/user.jsx";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = User();
  const navigate = useNavigate();

  const submithandle = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);

      alert("Login successful");

      navigate("/");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-300 dark:bg-[#0B0A10]">

      <div className="bg-white dark:bg-[#181622] p-8 rounded-2xl shadow-lg w-full max-w-md">

        <div className="flex justify-center mb-4">
          <div className="h-15 w-15 rounded-4xl bg-black flex justify-center overflow-hidden">
            <img className="object-cover" src="./src/assets/Logo.jpeg" />
          </div>
        </div>

        <form onSubmit={submithandle}>
          <div className="mb-4 w-full">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>

            <input
              type="Email"
              className="input-box dark:bg-[#0B0A10] dark:border-[#2A2438] dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-10 w-full">
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>

            <input
              type="Password"
              className="input-box dark:bg-[#0B0A10] dark:border-[#2A2438] dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <h5 className="flex flex-row-reverse text-xs mt-1 cursor-pointer text-gray-600 dark:text-gray-400">
              Forgot your password
            </h5>
          </div>

          <div className="w-full flex flex-col gap-4 items-center justify-center">

            <button
              type="submit"
              className="w-full h-10 bg-[#111] dark:bg-white dark:text-black text-white rounded-md cursor-pointer"
            >
              Log in
            </button>

            <h5 className="text-black dark:text-white">or</h5>

            <img
              src="https://thf.bing.com/th/id/ODF.cQGDzDdW-31GYqwCeCzTrw?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2"
              className="border-2 rounded-4xl p-1 border-gray-50 dark:border-[#2A2438] shadow-sm cursor-pointer"
            />

            <div className="flex flex-col text-center justify-center">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                By continuing you agree to here{" "}
                <span className="text-black dark:text-white font-bold text-xs cursor-pointer hover:underline">
                  Terms of Service
                </span>{" "}
                and acknowledge you've read our{" "}
                <span className="text-black dark:text-white font-bold text-xs cursor-pointer hover:underline">
                  Privacy Policy
                </span>
              </p>

              <div className="mt-8 mb-2 w-full h-0.5 bg-gray-300 dark:bg-[#2A2438]"></div>

              <span className="text-sm text-black dark:text-white">
                Not on here yet?{" "}
                <Link
                  to="/Register"
                  className="font-bold text-sm cursor-pointer hover:underline"
                >
                  Register
                </Link>
              </span>
            </div>

          </div>
        </form>

      </div>

    </div>
  );
};

export default Login;