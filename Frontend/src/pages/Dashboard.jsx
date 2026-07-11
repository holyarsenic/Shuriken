import { FaEye } from "react-icons/fa";
import { ImParagraphLeft } from "react-icons/im";
import { BiSolidHeart } from "react-icons/bi";
import LineGraphForViews from "../components/DashboardCharts/LineChart";
import PieChartView from "../components/DashboardCharts/PieChart";
import { DashboardPage } from "../context/dashboardStats";
import { useEffect } from "react";


const Dashboard = () => {

  const { dashboardStats, loading, fetchDashboardStats } = DashboardPage();

  useEffect(() => {
    fetchDashboardStats();
  },[fetchDashboardStats])

  if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B0A10]">
          <div className="flex">
            <span className="w-10 h-10 rounded-full border-4 border-slate-600 border-t-violet-500 animate-spin" />
          </div>
        </div>
      );
    }

    if (!dashboardStats) {
      return (
        <div className="min-h-screen ml-64 mt-20 flex items-center justify-center bg-[#0B0A10]">
          <p className="text-slate-400 text-sm">Post not found</p>
        </div>
      );
    }

  return (
    <div className="min-h-screen ml-64 mt-20 p-6 bg-[#0B0A10]">
      <div className="bg-[#121018]/80 border border-[#2A2438] rounded-2xl p-5 max-w-8xl flex gap-10 justify-between items-start">

        <div className="bg-[#181622] rounded-2xl border border-[#2A2438] p-6 w-full">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400">Total Views</p>
              <FaEye className="text-2xl font-bold text-white"/>
            </div>
              <h2 className="text-4xl font-bold text-white mt-3">
                {dashboardStats.totalViews}
              </h2>
        </div>

        <div className="bg-[#181622] rounded-2xl border border-[#2A2438] p-6 w-full">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400">Total Posts</p>
              <ImParagraphLeft className="text-2xl font-bold text-white"/>
            </div>
            <h2 className="text-4xl font-bold text-white mt-3">
                {dashboardStats.totalPosts}
            </h2>
        </div>

        <div className="bg-[#181622] rounded-2xl border border-[#2A2438] p-6 w-full">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400">Total Likes</p>
              <BiSolidHeart className="text-2xl font-bold text-white"/>
            </div>
            <h2 className="text-4xl font-bold text-white mt-3">
                {dashboardStats.totalLikes}
            </h2>
        </div>

      </div>
      <div className="flex gap-8 justify-between max-w-8xl">
        <div className="bg-[#121018]/80 border border-[#2A2438] rounded-2xl p-5 w-80 mt-6">

          <div className="bg-[#181622] rounded-2xl border border-[#2A2438] p-6">

            <div className="flex flex-col items-center text-center">

              <img
                src={dashboardStats.owner.avatar}
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-[#2A2438] object-cover"
              />

              <h2 className="text-white text-2xl font-bold mt-4">
                {dashboardStats.owner.fullNamw}
              </h2>

              <p className="text-gray-400 text-sm">
                {dashboardStats.owner.userName}
              </p>

              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                {dashboardStats.owner.bio}
              </p>

            </div>

            <div className="flex justify-between gap-3 mt-6">

              <div className="flex-1 bg-[#121018] border border-[#2A2438] rounded-xl py-3 text-center">
                <h3 className="text-white text-xl font-bold">
                  {dashboardStats.totalFollowers}
                </h3>
                <p className="text-gray-400 text-sm">
                  Followers
                </p>
              </div>


              <div className="flex-1 bg-[#121018] border border-[#2A2438] rounded-xl py-3 text-center">
                <h3 className="text-white text-xl font-bold">
                  100k
                </h3>
                <p className="text-gray-400 text-sm">
                  {dashboardStats.totalFollowing}
                </p>
              </div>

            </div>

            <button className="w-full mt-5 py-2 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition">
              Edit Profile
            </button>

          </div>

        </div>
        
        <div className="bg-[#121018]/80 border border-[#2A2438] rounded-2xl p-5 w-auto mt-6 flex-1">
          <div className="flex gap-5">
            <LineGraphForViews/>
            <PieChartView/>
          </div>  
        </div>
      </div>
    </div>
  )
}

export default Dashboard
