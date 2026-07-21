import { FaEye } from "react-icons/fa";
import { ImParagraphLeft } from "react-icons/im";
import { BiSolidHeart } from "react-icons/bi";
import LineGraphForViews from "../components/DashboardCharts/LineChart";
import PieChartView from "../components/DashboardCharts/PieChart";
import { DashboardPage } from "../context/dashboardStats";
import { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import EditPostPage from "../components/EditPostPage";
import EditProfilePage from "../components/EditProfilePage";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const {
    dashboardStats,
    statsLoading,
    postsLoading,
    fetchDashboardStats,
    fetchPostDashboard,
    dashboardPosts,
  } = DashboardPage();

  const [editPostId, setEditPostId] = useState(null);
  const [editProfile, setEditProfile] = useState(false);

   const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardStats();
    fetchPostDashboard();
  }, [fetchDashboardStats, fetchPostDashboard]);

  if (statsLoading || postsLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0B0A10]">
        <div className="flex">
          <span className="w-7 h-7 lg:w-10 lg:h-10 rounded-full border-4 border-slate-300 dark:border-slate-600 border-t-violet-500 dark:border-t-violet-500 animate-spin" />
        </div>
      </div>
    );
  }


  if (!dashboardStats) {
    return (
      <div className="min-h-screen ml-0 lg:ml-64 mt-20 flex items-center justify-center bg-white dark:bg-[#0B0A10]">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Something went wrong
        </p>
      </div>
    );
  }

  const handleEditPost = (postId) => {
    setEditPostId(postId);
  };

  return (
    <div className="min-h-screen ml-0 lg:ml-64 mt-4 lg:mt-20 p-3 lg:p-6 bg-gray-50 text-black dark:bg-[#0B0A10] dark:text-white">

      <FaArrowLeft className="block lg:hidden text-black dark:text-white text-xl mb-4"
      onClick={() => navigate(-1)}
      />

      <div className="bg-white border border-gray-300 dark:bg-[#121018]/80 dark:border-[#2A2438] rounded-2xl p-2 lg:p-5 max-w-full lg:max-w-8xl flex flex-col lg:flex-row gap-2 lg:gap-10 justify-between items-start">

        <div className="bg-white border border-gray-300 dark:bg-[#181622] dark:border-[#2A2438] rounded-2xl p-3 lg:p-6 w-full">

          <div className="w-full flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400">Total Views</p>
            <FaEye className="text-2xl font-bold text-black dark:text-white" />
          </div>
          <h2 className="text-2xl lg:text-4xl font-bold text-black dark:text-white mt-3">
            {dashboardStats.totalViews}
          </h2>
        </div>

        <div className="bg-white border border-gray-300 dark:bg-[#181622] dark:border-[#2A2438] rounded-2xl p-3 lg:p-6 w-full">
          <div className="w-full flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400">Total Posts</p>
            <ImParagraphLeft className="text-2xl font-bold text-black dark:text-white" />
          </div>
          <h2 className="text-2xl lg:text-4xl font-bold text-black dark:text-white mt-3">
            {dashboardStats.totalPosts}
          </h2>
        </div>

        <div className="bg-white border border-gray-300 dark:bg-[#181622] dark:border-[#2A2438] rounded-2xl p-3 lg:p-6 w-full">
          <div className="w-full flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400">Total Likes</p>
            <BiSolidHeart className="text-2xl font-bold text-black dark:text-white" />
          </div>
          <h2 className="text-2xl lg:text-4xl font-bold text-black dark:text-white mt-3">
            {dashboardStats.totalLikes}
          </h2>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 justify-between max-w-full lg:max-w-8xl mt-3 lg:mt-0">
        <div className="bg-white border border-gray-300 dark:bg-[#121018]/80 dark:border-[#2A2438] rounded-2xl p-2 lg:p-5 w-full lg:w-80 mt-3 lg:mt-6">
          <div className="w-full h-full bg-white border border-gray-300 dark:bg-[#181622] dark:border-[#2A2438] rounded-2xl p-3 lg:p-6">
            <div className="flex flex-col items-center text-center">
              <img
                src={dashboardStats.owner?.avatar}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover"
              />

              <h2 className="text-black dark:text-white text-2xl font-bold mt-4">
                {dashboardStats.owner?.fullName}
              </h2>

              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {dashboardStats.owner?.userName}
              </p>

              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                {dashboardStats.owner?.bio || "Add a Bio"}
              </p>
            </div>

            <div className="flex justify-between gap-3 mt-6">
              <div className="flex-1 bg-white border border-gray-300 dark:bg-[#121018] dark:border-[#2A2438] rounded-xl py-3 text-center">
                <h3 className="text-black dark:text-white text-xl font-bold">
                  {dashboardStats.totalFollowers}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Followers
                </p>
              </div>

              <div className="flex-1 bg-white border border-gray-300 dark:bg-[#121018] dark:border-[#2A2438] rounded-xl py-3 text-center">
                <h3 className="text-black dark:text-white text-xl font-bold">
                  {dashboardStats.totalFollowing}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Following
                </p>
              </div>
            </div>

            <button
              className="w-full mt-5 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black font-semibold hover:opacity-90 transition"
              onClick={() => setEditProfile(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-300 dark:bg-[#121018]/80 dark:border-[#2A2438] rounded-2xl p-2 lg:p-5 w-auto mt-3 lg:mt-6 flex-1">
          <div className="flex flex-col lg:flex-row gap-5">
            <LineGraphForViews data={dashboardStats.viewsAnalytics}/>
            <PieChartView
              followers={dashboardStats.totalFollowers}
              following={dashboardStats.totalFollowing}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-300 dark:bg-[#121018]/80 dark:border-[#2A2438] rounded-2xl p-2 lg:p-5 mt-6 mb-20">
        <div className="flex items-center mb-5 lg:mb-10">
          <h2 className="text-black dark:text-white text-lg lg:text-2xl font-bold">
            Your Recent Posts
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          {dashboardPosts?.map((post) => (
            <div
              key={post._id}
              className="relative bg-white border border-gray-300 dark:bg-[#181622] dark:border-[#2A2438] rounded-xl overflow-hidden flex flex-col lg:flex-row justify-between"
            >
              <div className="w-full lg:w-72 h-52 lg:h-56 shrink-0">
                <img
                  src={post.postFile}
                  alt={post.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div className="p-2 lg:p-5 flex flex-col justify-between gap-4 lg:gap-0 flex-1 mt-2 lg:mt-0">
                <div>
                  <h3 className="text-black dark:text-white font-bold text-xs lg:text-xl">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                    {post.description}
                  </p>
                </div>

                <div className="flex gap-8 text-sm">
                  <div className="ml-2 flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <FaEye className="text-lg" />
                    <span className="text-black dark:text-white">
                      {post.views}
                    </span>
                  </div>

                  <div className="ml-2 flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <BiSolidHeart className="text-lg" />
                    <span className="text-black dark:text-white">
                      {post.likesCount}
                    </span>
                  </div>
                </div>

                <p className="flex gap-1 text-gray-500 text-xs">
                  Uploaded:
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </p>
              </div>

              <FaPen
                className="hidden lg:block text-black dark:text-white text-2xl mr-10 mt-10 cursor-pointer"
                onClick={() => handleEditPost(post._id)}
              />

              <FaPen
                className="absolute top-3 right-3 lg:hidden  text-black dark:text-white text-xl cursor-pointer"
                onClick={() => handleEditPost(post._id)}
              />

            </div>
          ))}
        </div>

        {editPostId && (
          <EditPostPage
            postId={editPostId}
            closeEdit={() => setEditPostId(null)}
          />
        )}

        {editProfile === true && (
          <EditProfilePage closeProfileEdit={() => setEditProfile(null)} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;