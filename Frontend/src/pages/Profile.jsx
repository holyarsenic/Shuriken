import { ProfileData } from "../context/userProfile";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LikedPostsComponent from "../components/LikedPosts.component";
import EditProfilePage from "../components/EditProfilePage";
import Followers from "../components/Followers";
import Following from "../components/Following";
import { RiMenu3Fill } from "react-icons/ri";
import { User } from "../context/user";
import { FaArrowLeftLong } from "react-icons/fa6";

const Profile = () => {
  const navigate = useNavigate();

  const { fetchProfile, profile, loading } = ProfileData();
  const { logOut } = User();

  const [ activeTab, setActiveTab ] = useState("posts");
  const [ editProfile, setEditProfile ] = useState(false);
  const [ followersTab, setFollowersTab ] = useState(false);
  const [ followingTab, setFollowingTab ] = useState(false);
  const [ respBar, setResBar ] =useState(false);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    const handleClick = () => {
      setResBar(false);
    };

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0B0A10]">
        <div className="flex">
          <span className="w-7 h-7 lg:w-10 lg:h-10 rounded-full border-4 border-slate-300 dark:border-slate-600 border-t-violet-500 dark:border-t-violet-500 animate-spin" />
        </div>
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="min-h-screen ml-64 mt-20 flex items-center justify-center bg-white dark:bg-[#0B0A10]">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Post not found
        </p>
      </div>
    );
  }

  function handlePostClick(PostId) {
    navigate(`/post/${PostId}`);
  }

  

  return (
    <div className="min-h-screen ml-0 lg:ml-64 mt-10 lg:mt-20 px-4 py-4 lg:px-8 lg:py-8 bg-white text-black dark:bg-[#0B0A10] dark:text-white">
      <div className="border border-gray-300 dark:border-[#2A2438] rounded-2xl bg-white dark:bg-[#14141C] p-4 lg:p-8">

        <div className="flex items-center gap-4 lg:gap-10">
          <img
            src={profile.avatar}
            className="w-20 h-20 lg:w-40 lg:h-40 rounded-full object-cover border border-gray-300 dark:border-gray-800"
          />

          <div className="flex-1">

            <div className="flex items-center gap-3 lg:gap-5">

              <h1 className="text-sm lg:text-2xl font-medium">
                @{profile.userName}
              </h1>

              <button
                className="px-3 py-2 lg:px-5 lg:py-2 text-xs lg:text-base rounded-xl bg-[#6D28D9] hover:bg-[#7C3AED] transition text-white"
                onClick={() => setEditProfile(true)}
              >
                Edit Profile
              </button>

            </div>

            <div className="flex gap-5 mt-4 lg:gap-10 lg:mt-8">

              <div>
                <p className="text-lg lg:text-2xl font-bold">{profile.totalPosts}</p>
                <p className="text-sm lg:text-base text-slate-500 dark:text-slate-400">Posts</p>
              </div>

              <div
                onClick={() => setFollowersTab(true)}
                className="cursor-pointer"
              >
                <p className="text-lg lg:text-2xl font-bold">{profile.followersCount}</p>
                <p className="text-sm lg:text-base text-slate-500 dark:text-slate-400">
                  Followers
                </p>
              </div>

              <div
                onClick={() => setFollowingTab(true)}
                className="cursor-pointer"
              >
                <p className="text-lg lg:text-2xl font-bold">{profile.followingCount}</p>
                <p className="text-sm lg:text-base text-slate-500 dark:text-slate-400">
                  Following
                </p>
              </div>

            </div>

            <div className="mt-4 lg:mt-8">

              <h2 className="text-sm lg:text-xl font-semibold">
                {profile.fullName}
              </h2>

              <p className="text-sm lg:text-base text-slate-500 dark:text-slate-400 mt-2">
                {profile.bio}
              </p>

            </div>

          </div>

        </div>
      </div>

      <div className="mt-5 lg:mt-10 border-t border-gray-300 dark:border-[#2A2438]" />

      <div className="flex items-start gap-6 lg:gap-12 mt-3 lg:mt-6">

        <button
          onClick={() => setActiveTab("posts")}
          className={`pb-1 lg:pb-3 font-semibold cursor-pointer text-xs lg:text-base ${
            activeTab === "posts"
              ? "border-b-2 border-[#7C3AED]"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          YOUR POSTS
        </button>

        <button
          onClick={() => setActiveTab("likedPosts")}
          className={`pb-1 lg:pb-3 font-semibold cursor-pointer 
            text-xs lg:text-base
            ${
            activeTab === "likedPosts"
              ? "border-b-2 border-[#7C3AED]"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          LIKED
        </button>

      </div>

      {activeTab === "posts" && (
        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3 lg:gap-6 space-y-6 mt-5 lg:mt-10 mb-20">

          {profile.myPosts.map((post) => (
            <div
              key={post._id}
              className="rounded-xl overflow-hidden hover:scale-[1.02] transition cursor-pointer"
              onClick={() => handlePostClick(post._id)}
            >
              <img
                src={post.postFile}
                alt={post.title}
                className="rounded-xl w-full object-cover"
              />

              <div className="p-3 flex justify-between items-center">
                <p className="truncate text-sm font-medium">
                  {post.title}
                </p>

                <HiDotsHorizontal className="cursor-pointer text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white" />
              </div>
            </div>
          ))}

        </div>
      )}

      {activeTab === "likedPosts" && (
        <LikedPostsComponent channelId={profile._id} />
      )}

      {editProfile === true && (
        <EditProfilePage closeProfileEdit={() => setEditProfile(false)} />
      )}

      {followersTab === true && (
        <Followers
          userId={profile._id}
          closeFollowersTab={() => setFollowersTab(false)}
        />
      )}

      {followingTab === true && (
        <Following
          userId={profile._id}
          closeFollowingTab={() => setFollowingTab(false)}
        />
      )}

      <div className="fixed top-5 right-3 lg:hidden"
      onClick={(e) => {
        e.stopPropagation();
        setResBar(true)}}
      >
          <RiMenu3Fill className="text-2xl text-black dark:text-white"/>
      </div>

      {respBar === true && (
         <div className="fixed top-4 right-2 w-55 bg-white dark:bg-[#111018] border border-gray-300 dark:border-slate-700 rounded-md py-2 z-15"
         onClick={(e) => e.stopPropagation()}
         >

                <FaArrowLeftLong
                  className="ml-2 mt-2 mb-2 text-xl text-gray-700 dark:text-slate-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#221E2C] transition"
                  onClick={() => setResBar(false)}
                />
                
                <button
                  className="w-full text-left px-2 py-1 text-base text-gray-700 dark:text-slate-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#221E2C] transition"
                  onClick={() => navigate(`/settings`)}
                >
                  Settings
                </button>

                <button
                  className="w-full text-left px-2 py-1 text-base text-gray-700 dark:text-slate-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#221E2C] transition"
                  onClick={() => navigate(`/dashboard`)}
                >
                 View  Dashboard
                </button>

                <button
                  className="w-full text-left px-2 py-1 text-base cursor-pointer text-rose-500 hover:bg-gray-100 dark:hover:bg-[#221E2C] transition"
                  onClick={logOut}
                >
                  Log out
                </button>

              </div>
      )}

    </div>
  );
};

export default Profile;