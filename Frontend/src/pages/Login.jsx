

const Login = () => {
  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-gray-300'>

      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>

        <div className='flex justify-center mb-4'>
          <h2>X</h2>
        </div>

          <form>
          <div className="mb-4 w-full">
            <label 
            htmlFor="Email" 
            className="block text-sm font-medium text-gray-700">Email</label>

          <input type="Email" className="input-box"/>
          </div>

          <div className="mb-10 w-full"> 
            <label 
            htmlFor="Password" 
            className="block text-sm font-medium text-gray-700">Password</label>
          
          <input type="Password" className="input-box"/>

          <h5 className="flex flex-row-reverse text-xs mt-1">Forgot your password</h5>
          </div>

          <div className="w-full flex flex-col gap-4 items-center justify-center">
            
            <button className="w-full h-10 bg-red-500 text-white rounded-md">Login in</button>
            
            <h5>or</h5>
              
            <img src="https://thf.bing.com/th/id/ODF.cQGDzDdW-31GYqwCeCzTrw?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2" className="border-2 rounded-4xl p-1 border-gray-50 shadow-sm" />

            <div className="flex flex-col text-center justify-center">
            <p className="text-xs">By continuing you agree to here <span className="text-black font-bold text-sm">Terms of Service</span> and acknowledge you've read our <span className="text-black font-bold">Privacy Policy</span></p>
            <div className="mt-8 mb-2 w-full h-0.5 bg-gray-300"></div>
            <p className="text-sm">Not on here yet? <span className="text-black font-bold text-sm">Sign Up</span></p>
            </div>
          
          </div>

          </form>

      </div>

    </div>
  )
}

export default Login
