import { useState } from "react"
import { Link } from "react-router-dom"


const Login = () => {

  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")
  const submithandle = (e) => {
    e.preventDefault();
    console.log(email, password);
    
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-gray-300'>

      <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md'>

        <div className="flex justify-center mb-4">
        <div className=' h-15 w-15 rounded-4xl bg-black flex justify-center overflow-hidden'>
          <img className='object-cover' src="./src/assets/Logo.jpeg" />
        </div>
        </div>

          <form onSubmit={submithandle}>
          <div className="mb-4 w-full">
            <label 
            htmlFor="Email" 
            className="block text-sm font-medium text-gray-700">Email</label>

          <input 
          type="Email"
          className="input-box"
          value={email}
          onChange={(e) =>setEmail(e.target.value)}
          required
          />
          </div>

          <div className="mb-10 w-full"> 
            <label 
            htmlFor="Password" 
            className="block text-sm font-medium text-gray-700">Password</label>
          
          <input 
          type="Password" 
          className="input-box"
          value={password}
          onChange={(e) =>setPassword(e.target.value)}
          required
          />

          <h5 className="flex flex-row-reverse text-xs mt-1 cursor-pointer">Forgot your password</h5>
          </div>

          <div className="w-full flex flex-col gap-4 items-center justify-center">
            
            <button className="w-full h-10 bg-[#6a99eb] text-white rounded-md cursor-pointer">Log in</button>
            
            <h5>or</h5>
              
            <img src="https://thf.bing.com/th/id/ODF.cQGDzDdW-31GYqwCeCzTrw?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2" className="border-2 rounded-4xl p-1 border-gray-50 shadow-sm cursor-pointer" />

            <div className="flex flex-col text-center justify-center">
            <p className="text-xs">By continuing you agree to here <span className="text-black font-bold text-xs cursor-pointer hover:underline">Terms of Service</span> and acknowledge you've read our <span className="text-black font-bold text-xs cursor-pointer hover:underline">Privacy Policy</span></p>
            <div className="mt-8 mb-2 w-full h-0.5 bg-gray-300"></div>
            <span className="text-sm">Not on here yet? <Link to="/Register" className="text-black font-bold text-sm cursor-pointer hover:underline">Register</ Link></span>
            </div>
          
          </div>

          </form>

      </div>

    </div>
  )
}

export default Login
