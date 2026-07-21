import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../context/user.jsx";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] =useState("");

  const { login, loginLoading  } = User();  
  const navigate = useNavigate();

  const submithandle = async (e) => {
    e.preventDefault();

    try {
      await login(email, password); 

      navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);

      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-gray-300 text-black dark:text-white dark:bg-[#14131C]'>

      <div className='bg-white dark:bg-violet-300/30 p-4 lg:p-8 rounded-2xl w-80 lg:w-full max-w-sm'>

        <div className="flex justify-center mb-4">
          <div className='h-12 w-12 lg:h-15 lg:w-15 rounded-4xl bg-black flex justify-center overflow-hidden'>
            <img className='object-cover' src="./src/assets/Logo.jpeg" />
          </div>
        </div>

          <form onSubmit={submithandle}>
          <div className="mb-4 w-full">
            <label 
            htmlFor="Email" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>

            <input 
            type="Email"
            className="input-box"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            />
          </div>

          <div className="mb-6 lg:mb-10 w-full"> 
            <label 
            htmlFor="Password" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          
            <input 
            type="Password" 
            className="input-box"
            value={password}
            onChange={(e) =>setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            />
            <div className="w-full flex justify-between">
              <p className=" ml-1 text-red-400 text-xs mt-1">{message}</p>
              <h5 className="flex flex-row-reverse text-xs mt-1 cursor-pointer text-violet-300">Forgot your password</h5>
            </div>
          </div>

          <div className="w-full flex flex-col gap-2 lg:gap-4 items-center justify-center">
            
            <button 
            type="submit" 
            disabled={loginLoading}
            className="w-full h-10 bg-[#111] dark:bg-violet-400 text-white rounded-md cursor-pointer flex items-center justify-center">
             {loginLoading ? (
                <span className="w-5 h-5 lg:w-7 lg:h-7 rounded-full border border-white border-t-transparent animate-spin"></span>
              ) : (
                "Log in"
              )}
            </button>

            <div className="flex flex-col text-center justify-center">
              <div className="mt-2 mb-2 w-full h-0.5 bg-gray-300"></div>
              <span className="text-xs lg:text-sm">Not on here yet? <Link to="/Register" className="text-black dark:text-violet-400 font-bold text-xs lg:text-sm cursor-pointer hover:underline ml-2">Register</ Link></span>
            </div>
          
          </div>

          </form>

      </div>

    </div>
  )
}

export default Login;
