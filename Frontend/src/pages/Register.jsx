import { User } from "../context/user.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const { register } = User();
  const navigate = useNavigate();

  const Regsubmithandle = async (e) => {
    e.preventDefault();

    try {
      await register(fullName, userName, email, password);

      alert("Registration successful");
      navigate("/");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-300 text-black dark:text-white dark:bg-[#14131C]">

      <div className="bg-white dark:bg-violet-300/30 p-8 rounded-2xl shadow-lg w-full max-w-sm lg:max-w-md">

        <div className="flex justify-center mb-4">
          <div className="h-15 w-15 rounded-4xl bg-black flex justify-center overflow-hidden">
            <img className="object-cover" src="./src/assets/Logo.jpeg" />
          </div>
        </div>

        <form onSubmit={Regsubmithandle}>

          <div className="mb-4 w-full">
            <label
              htmlFor="Text"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Name
            </label>

            <input
              type="text"
              className="input-box dark:bg-[#0B0A10] dark:border-[#2A2438] text-gray-700 dark:text-gray-300"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 w-full">
            <label
              htmlFor="Text"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              User Name
            </label>

            <input
              type="text"
              className="input-box dark:bg-[#0B0A10] dark:border-[#2A2438] dark:text-white"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

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
          </div>

          <div className="w-full flex flex-col gap-4 items-center justify-center">

            <button className="w-full h-10 bg-[#111] dark:bg-violet-400 text-white rounded-md cursor-pointer">
              Sign in
            </button>

            <h5 className="text-black dark:text-white">or</h5>

            <img
              src="https://thf.bing.com/th/id/ODF.cQGDzDdW-31GYqwCeCzTrw?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2"
              className="border-2 rounded-4xl p-1 bg-gray-50 shadow-sm cursor-pointer"
            />

            <div className="mt-2 mb-2 w-full h-0.5 bg-gray-300"></div>

            <span className="text-sm text-black dark:text-white">
              Already have an account?
              <Link
                to="/Login"
                className="ml-2 dark:text-violet-400 font-bold text-sm cursor-pointer hover:underline"
              >
                Log in
              </Link>
            </span>

          </div>

        </form>

      </div>

    </div>
  );
};

export default Register;