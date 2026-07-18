import { useState, useEffect } from "react"
import { IoIosHome } from "react-icons/io"
import {
  MdHistoryToggleOff,
  MdAddBox,
  MdSpaceDashboard,
} from "react-icons/md"
import { FiPlus } from "react-icons/fi"
import { IoSettingsSharp } from "react-icons/io5"
import { SlArrowDown } from "react-icons/sl"
import { NavLink } from "react-router-dom"
import logo from "../assets/Logo.jpeg"
import { useNavigate } from "react-router-dom"
import { User } from "../context/user"
import SearchBar from "./SearchBar.component"
import { Theme } from "../context/theme"
import { CiSearch } from "react-icons/ci";

const SidebarItem = ({ icon, label, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center justify-center lg:justify-start gap-4 w-full px-5 py-3 lg:rounded-xl transition-all duration-300 ${
          isActive
            ? "lg:bg-gray-200 lg:dark:bg-[#23232A] text-black dark:text-white"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1A1A20] hover:text-black dark:hover:text-white"
        }`
      }
    >
      <span className="text-2xl">{icon}</span>
      <span className="hidden lg:block font-medium">{label}</span>
    </NavLink>
  );
};

const Navbar = () => {
  const [ profileOpen, setProfileOpen ] = useState(false)

  const { theme, toggleTheme } = Theme()
  const { user, logOut } = User()

  useEffect(() => {
    const handleClick = () => {
      setProfileOpen(false);
    };

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="fixed left-0 top-0 w-64 h-screen bg-gray-50 dark:bg-[#111018] border-r border-gray-300 dark:border-[#3B0764] hidden lg:flex flex-col justify-between z-10">

        <div>
          <div className="px-4 mt-26 flex flex-col gap-3">
            <SidebarItem icon={<IoIosHome />} label="Home" to="/" />
            <SidebarItem icon={<MdHistoryToggleOff />} label="History" to="/History" />
            <SidebarItem icon={<MdAddBox />} label="Create" to="/Create" />
            <SidebarItem icon={<MdSpaceDashboard />} label="Dashboard" to="/Dashboard" />
          </div>
        </div>

        <div className="p-4 border-t border-gray-300 dark:border-white/10 w-full flex items-center justify-center">
          <NavLink
            to="/Settings"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1A1A20] hover:text-black dark:hover:text-white transition"
          >
            <IoSettingsSharp className="text-2xl" />
            <span className="ml-2 text-md font-medium">
              Settings
            </span>
          </NavLink>
        </div>

      </div>

      <div className="fixed bottom-0 left-0 right-0 h-15 bg-gray-50 dark:bg-[#111018] border-t border-gray-300 dark:border-[#3B0764] flex justify-around items-center lg:hidden z-20">
        <SidebarItem icon={<IoIosHome />} label="Home" to="/" />
        <SidebarItem icon={<CiSearch/>} label="Search" to=""/>
        <SidebarItem icon={<MdAddBox />} label="Create" to="/Create" />
        <SidebarItem icon={<MdHistoryToggleOff />} label="History" to="/History" />
        <SidebarItem icon={<img src={user.avatar} className="w-7 h-7 rounded-full object-cover"/>} label="Profile" to={`/profile/${user.userName}`}/> 
      </div>

      <header
        className="fixed w-full top-0 left-0 right-0 h-20 bg-gray-50  dark:bg-[#111111] border-b border-gray-300 dark:border-[#3B0764] z-10 hidden lg:flex items-center justify-between px-10"
      >
        <div className="h-20 flex justify-center items-center gap-2 px-2">
          <img
            src={logo}
            className="p-1 bg-black h-8 w-8 rounded-full object-cover"
          />

          <h1 className="text-2xl font-semibold tracking-wide text-black dark:text-white">
            Shuriken
          </h1>
        </div>

        <SearchBar />

        <div className="flex w-fit items-center justify-end gap-6 z-10">

          <button className="p-1 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition cursor-pointer">
            <FiPlus
              className="text-3xl text-gray-700 dark:text-slate-300"
              onClick={() => navigate("/create")}
            />
          </button>

          <div className="relative">
            <div
              className="flex items-center gap-3 cursor-pointer rounded-xl px-3 py-2"
              onClick={(e) => {
                e.stopPropagation();
                setProfileOpen((prev) => !prev);
              }}
            >
              <img
                src={user.avatar}
                className="w-10 h-10 rounded-full object-cover"
              />

              <SlArrowDown
                className={`text-sm text-black dark:text-white transition-transform duration-200 ${
                  profileOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            {profileOpen && (
              <div className="absolute top-20 right-0 w-55 bg-white dark:bg-[#111018] border border-gray-300 dark:border-slate-700 rounded-md py-2 z-15 shadow-lg">

                <button
                  className="w-full text-left px-4 py-2 text-lg text-gray-700 dark:text-slate-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#221E2C] transition"
                  onClick={() => navigate(`/profile/${user.userName}`)}
                >
                  Your profile
                </button>

                <button
                  className="w-full text-left px-4 py-2 text-lg text-gray-700 dark:text-slate-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#221E2C] transition"
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>

                <button
                  className="w-full text-left px-4 py-2 text-lg cursor-pointer text-rose-500 hover:bg-gray-100 dark:hover:bg-[#221E2C] transition"
                  onClick={logOut}
                >
                  Log out
                </button>

              </div>
            )}
          </div>

        </div>
      </header>
    </>
  );
};

export default Navbar;