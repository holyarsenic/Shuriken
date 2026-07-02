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

const SidebarItem = ({ icon, label, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 w-full px-5 py-3 rounded-xl transition-all duration-200 ${
          isActive
            ? "bg-slate-800 text-white"
            : "text-white hover:bg-slate-900"
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
      <div className="fixed left-0 top-0 w-64 h-screen bg-[#111] border-r border-slate-800 flex flex-col justify-between">
        <div>
          <div className="h-20 flex items-center px-8 border-b border-slate-800">
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Shuriken
            </h1>
          </div>

          <div className="px-4 mt-6 flex flex-col gap-2">
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

        <div className="p-4 border-t border-slate-800 w-full flex items-center justify-center">
          <SidebarItem
            icon={<IoSettingsSharp />}
            label="Settings"
            to="/Settings"
          />
        </div>
      </div>


      <header
        className="ml-64 h-20 bg-[#111] border-b border-slate-800
      flex items-center justify-between px-10">
        <div></div>

        <div className="relative w-1/2 flex items-center justify-center">
          <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-full h-11 rounded-full
            border-2 border-slate-500
            text-white
            pl-11 pr-4
            placeholder:text-gray-400
            focus:outline-none
            focus:border-slate-400
            transition"
          />
        </div>

      <div className="flex w-fit items-center justify-end gap-6">
        <div className="flex rounded-xl items-center justify-end gap-6">
          <button
            className="p-1 border-2 border-slate-300 rounded-xl hover:bg-slate-900 transition cursor-pointer"
          >
            <FiPlus className="text-2xl text-slate-300" />
          </button>

          <div className="flex items-center gap-3 cursor-pointer rounded-xl border-2 hover:border-slate-300 px-3 py-2 transition">
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