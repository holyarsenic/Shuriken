

import { useState } from "react"
import { Link } from "react-router-dom"


const Register = () => {

  const[name,setName]= useState("")
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")
  const Regsubmithandle = (e) => {
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

          <form onSubmit={Regsubmithandle}>

          <div className="mb-4 w-full">
            <label 
            htmlFor="Text" 
            className="block text-sm font-medium text-gray-700">Name</label>

          <input 
          type="text"
          className="input-box"
          value={name}
          onChange={(e) =>setName(e.target.value)}
          required
          />
          </div>

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
          </div>

          <div className="w-full flex flex-col gap-4 items-center justify-center">
            
            <button className="w-full h-10 bg-[#6a99eb] text-white rounded-md cursor-pointer">Sign in</button>
            
            <h5>or</h5>
              
            <img src="https://thf.bing.com/th/id/ODF.cQGDzDdW-31GYqwCeCzTrw?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2" className="border-2 rounded-4xl p-1 border-gray-50 shadow-sm cursor-pointer" />

           
            <div className="mt-8 mb-2 w-full h-0.5 bg-gray-300"></div>
            <span className="text-sm">Already have an account? <Link to="/Login" className="text-black font-bold text-sm cursor-pointer hover:underline">Log in</ Link></span>
            </div>
          
    

          </form>

      </div>

    </div>
  )
}

export default Register
