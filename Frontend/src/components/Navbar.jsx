import { IoIosHome } from "react-icons/io";
import { MdHistoryToggleOff, MdAddBox, MdSpaceDashboard } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { SlArrowDown } from "react-icons/sl";

const SidebarIcon = ({ icon, label }) => {
  return (
    <div className="flex items-center gap-3 w-full px-4 py-2 cursor-pointer
      text-slate-300 hover:bg-slate-800 rounded-lg transition group">

      <div className="text-2xl group-hover:scale-110 transition">
        {icon}
      </div>

      <span className="hidden group-hover:block text-sm font-medium text-white">
        {label}
      </span>
    </div>
  );
};

const Navbar = () => {
  return (
    <>
      <div className="fixed top-0 left-0 h-full w-16 hover:w-52 
      bg-[#111827] border-r border-slate-800 
      flex flex-col justify-between items-center py-6 
      transition-all duration-300 group">

        <div className="flex flex-col gap-6 items-center w-full">

          <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center overflow-hidden">
            <img src="./src/assets/Logo.jpeg" className="w-7 h-7 object-cover" />
          </div>

          <SidebarIcon icon={<IoIosHome />} label="Home" />
          <SidebarIcon icon={<MdHistoryToggleOff />} label="History" />
          <SidebarIcon icon={<MdAddBox />} label="Create" />
          <SidebarIcon icon={<MdSpaceDashboard />} label="Dashboard" />
        </div>

        <SidebarIcon icon={<IoSettingsSharp />} label="Settings" />
      </div>

      <div className="ml-16 h-16 flex items-center justify-between px-6 
      bg-[#111827] border-b border-slate-800">

        <div className="w-full flex items-center justify-center">
          <div className="relative w-1/2">

            <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400" />

            <input
              type="text"
              placeholder="Search your interests"
              className="w-full h-10 pl-10 rounded-full 
              bg-[#0f172a] text-white placeholder-slate-400
              border border-slate-700
              focus:outline-none focus:ring-2 focus:ring-slate-600 transition"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">

          <MdAddBox className="text-4xl text-slate-300 hover:text-white cursor-pointer transition" />

          <img
            src="https://i.pinimg.com/736x/cd/63/af/cd63afd8681787eef6a56fb0e929996d.jpg"
            className="w-10 h-10 rounded-full object-cover border border-slate-700"
          />

          <SlArrowDown className="text-slate-300 cursor-pointer hover:text-white transition" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
