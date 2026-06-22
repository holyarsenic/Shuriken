import { IoIosHome } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { SlArrowDown } from "react-icons/sl";


const Navbar = () => {
  return (
    <>
      <div className=" pt-8 pb-8 fixed top-0 right-0 left-0 w-17 h-full text-white border-r-2 border-gray-300 flex flex-col items-center justify-between">
        <div className="flex flex-col h-50 items-center justify-between">
          <div className=" h-8 w-8 bg-black flex items-center justify-center rounded-2xl overflow-hidden">
            <img className="h-6 w-6 object-cover rounded-2xl" src="./src/assets/Logo.jpeg"/>
          </div>
          <div className="text-black text-3xl">
            <IoIosHome/>
          </div>
          <div className="text-black text-2xl">
            <FaHistory/>
          </div>
        </div>
        <div className="text-black text-3xl">
            <IoSettingsSharp/>
        </div>
      </div>

      <div className="p-5 h-20 flex items-center justify-center fixed top-0 left-17 right-0">
        <div className="w-full h-full flex items-center justify-center">
          <input type="text" placeholder="Search your Intrests" className="relative w-full h-12 bg-[#F0F0F0] rounded-xl pl-10 focus:outline-none font-medium"/>
          <CiSearch className="absolute left-8 text-2xl"/>
        </div>

        <div className="h-20 w-30 ml-1 flex items-center justify-center gap-4">
            <div className="h-12 w-12 rounded-3xl overflow-hidden border-2 border-blue-100">
                <img src="https://i.pinimg.com/736x/cd/63/af/cd63afd8681787eef6a56fb0e929996d.jpg" className="object-cover h-12 w-12 rounded-3xl "/>
            </div>
            <SlArrowDown/>
        </div>
          
      </div>
      
    </>
  )
}

export default Navbar
