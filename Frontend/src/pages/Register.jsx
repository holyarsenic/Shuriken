import { User } from "../context/user.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.jpeg";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] =useState("");
   const [messageType, setMessageType] = useState(""); 

  const { register, registerLoading } = User();
  const navigate = useNavigate();

  const Regsubmithandle = async (e) => {
    e.preventDefault();

    try {
      await register(fullName, userName, email, password);

      setMessage("Registration successful")
      setMessageType("success")

       setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);

      navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
      setMessageType("error")

      setTimeout(() => {
        setMessage("");
        setMessageType("")
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-300 text-black dark:text-white dark:bg-[#14131C]">

      <div className="bg-white dark:bg-violet-300/30 p-8 rounded-2xl shadow-lg w-full max-w-sm lg:max-w-md">

        <div className="flex justify-center mb-4">
          <div className="h-15 w-15 rounded-4xl bg-black flex justify-center overflow-hidden">
            <img className="object-cover" src={Logo} alt="Logo"  />
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
              placeholder="Enter your full name"
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
              placeholder="Choose a username"
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
              placeholder="Enter your email"
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
              placeholder="Create a password"
              required
            />

            <p className= {`ml-1 text-red-400 text-xs mt-1 ${
                  messageType === "success"
                    ? "text-green-500"
                    : "text-red-500"
                }`}>{message}</p>
          </div>

          <div className="w-full flex flex-col gap-4 items-center justify-center">

            <button 
            disabled={registerLoading}
            className="w-full h-10 bg-[#111] dark:bg-violet-400 text-white rounded-md cursor-pointer flex items-center justify-center">
              {registerLoading ? (
                <span className="w-5 h-5 lg:w-7 lg:h-7 rounded-full border border-white border-t-transparent animate-spin"></span>
              ) : (
                "Log in"
              )}
            </button>

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