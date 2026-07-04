import { IoIosHome } from "react-icons/io";
import {
  MdHistoryToggleOff,
  MdAddBox,
  MdSpaceDashboard,
} from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { SlArrowDown } from "react-icons/sl";
import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.jpeg";


const SidebarItem = ({ icon, label, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 w-full px-5 py-3 rounded-xl transition-all duration-300 ${
          isActive
            ? "bg-[#23232A] text-white"
            : "text-gray-300 hover:bg-[#1A1A20] hover:text-white"
        }`
      }
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </NavLink>
  );
};

const Navbar = () => {
  return (
    <>
      <div className="fixed left-0 top-0 w-64 h-screen bg-[#111018] border-r border-[#3B0764] flex flex-col justify-between">
        <div>
          <div className="px-4 mt-26 flex flex-col gap-3">
            <SidebarItem
              icon={<IoIosHome />}
              label="Home"
              to="/"
            />

            <SidebarItem
              icon={<MdHistoryToggleOff />}
              label="History"
              to="/History"
            />

            <SidebarItem
              icon={<MdAddBox />}
              label="Create"
              to="/Create"
            />

            <SidebarItem
              icon={<MdSpaceDashboard />}
              label="Dashboard"
              to="/Dashboard"
            />
          </div>
        </div>

        <div className="p-4 border-t border-white/10 w-full flex items-center justify-center">
          <NavLink
                to="/Settings"
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-[#1A1A20] hover:text-white transition"
              >
            <IoSettingsSharp className="text-2xl text-white" />
            <span className="ml-2 text-white text-md font-medium">Settings</span>
          </NavLink>
        </div>
      </div>


      <header
        className="fixed w-full top-0 left-0 right-0 h-20 bg-[#111111] border-b border-[#3B0764] z-10
      flex items-center justify-between px-10">
         <div className="h-20 flex justify-center items-center gap-2 px-2">
          <img src={logo} className="h-10 w-10 rounded-full object-cover" />
            <h1 className="text-3xl font-semibold tracking-wide text-white">
              Shuriken
            </h1>
          </div>
        <div className="relative w-1/2 flex items-center justify-center">
          <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-white" />

          <input
            type="text"
            placeholder="Search..."
           className="w-full h-11 rounded-full
            bg-[#151320]
            border border-white/60
            text-white
            pl-11 pr-4
            placeholder:text-white/60
            focus:outline-none
            focus:border-violet-500
            transition"
          />
        </div>

      <div className="flex w-fit items-center justify-end gap-6">
        <div className="flex rounded-xl items-center justify-end gap-6">
          <button
            className="p-1 rounded-xl hover:bg-gray-500 transition cursor-pointer"
          >
            <FiPlus className="text-3xl text-slate-300" />
          </button>

          <div className="flex items-center gap-3 cursor-pointer rounded-xl border-2 border-white/10 hover:border-slate-300 px-3 py-2 transition">
            <img
              src="https://i.pinimg.com/736x/cd/63/af/cd63afd8681787eef6a56fb0e929996d.jpg"
              className="w-10 h-10 rounded-full object-cover"
            />

            <SlArrowDown className="text-sm text-slate-400" />
          </div>
        </div>
      </div>
      </header>
    </>
  );
};

export default Navbar;