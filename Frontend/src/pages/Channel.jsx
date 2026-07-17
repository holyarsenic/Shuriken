import { ChannelData } from "../context/channelProfile";
import { GoArrowUpRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LikedPostsComponent from "../components/LikedPosts.component";
import Followers from "../components/Followers";
import Following from "../components/Following";

const Channel = () => {
  const navigate = useNavigate();
  const { channelUsername } = useParams();

  const { loading, fetchChannelId, channel, toggleFollow } = ChannelData();

  const [activeTab, setActiveTab] = useState("posts");
  const [followersTab, setFollowersTab] = useState(false);
  const [followingTab, setFollowingTab] = useState(false);

  useEffect(() => {
    fetchChannelId(channelUsername);
  }, [channelUsername, fetchChannelId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0A10]">
        <div className="flex">
          <span className="w-10 h-10 rounded-full border-4 border-slate-600 border-t-violet-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="min-h-screen ml-64 mt-20 flex items-center justify-center bg-white dark:bg-[#0B0A10]">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          User not found
        </p>
      </div>
    );
  }

  function handlePostClick(PostId) {
    navigate(`/post/${PostId}`);
  }

  return (
    <div className="min-h-screen ml-64 mt-20 px-8 py-8 bg-white text-black dark:bg-[#0B0A10] dark:text-white">
      <div className="border border-gray-300 dark:border-[#2A2438] rounded-2xl bg-white dark:bg-[#14141C] p-8">

        <div className="flex items-center gap-10">
          <img
            src={channel.avatar}
            className="w-40 h-40 rounded-full object-cover border border-gray-300 dark:border-gray-800"
          />

          <div className="flex-1">

            <div className="flex items-center gap-3">

              <h1 className="text-2xl font-medium">
                @{channel.userName}
              </h1>

              <button
                onClick={() => toggleFollow(channel._id)}
                className={`px-5 py-2 rounded-xl cursor-pointer text-white ${
                  channel.isFollowed
                    ? "bg-[#58555e]"
                    : "bg-violet-500"
                }`}
              >
                {channel.isFollowed ? "Following" : "Follow"}
              </button>

            </div>

            <div className="flex gap-10 mt-8">

              <div>
                <p className="text-2xl font-bold">{channel.totalPosts}</p>
                <p className="text-slate-500 dark:text-slate-400">Posts</p>
              </div>

              <div
                className="cursor-pointer"
                onClick={() => setFollowersTab(true)}
              >
                <p className="text-2xl font-bold">
                  {channel.followersCount}
                </p>
                <p className="text-slate-500 dark:text-slate-400">
                  Followers
                </p>
              </div>

              <div
                className="cursor-pointer"
                onClick={() => setFollowingTab(true)}
              >
                <p className="text-2xl font-bold">
                  {channel.followingCount}
                </p>
                <p className="text-slate-500 dark:text-slate-400">
                  Following
                </p>
              </div>

            </div>

            <div className="mt-8">

              <h2 className="text-xl font-semibold">
                {channel.fullName}
              </h2>

              <p className="text-slate-500 dark:text-slate-400 mt-2">
                {channel.bio}
              </p>

            </div>

          </div>

        </div>
      </div>

      <div className="mt-10 border-t border-gray-300 dark:border-[#2A2438]" />

      <div className="flex items-start gap-12 mt-6">

        <button
          onClick={() => setActiveTab("posts")}
          className={`pb-3 font-semibold cursor-pointer ${
            activeTab === "posts"
              ? "border-b-2 border-[#7C3AED]"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          POSTS
        </button>

        <button
          onClick={() => setActiveTab("likedPosts")}
          className={`pb-3 font-semibold cursor-pointer ${
            activeTab === "likedPosts"
              ? "border-b-2 border-[#7C3AED]"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          LIKED
        </button>

      </div>

      {activeTab === "posts" && (
        <div className="columns-2 sm:columns-2 lg:columns-4 xl:columns-5 gap-6 space-y-6 mt-10">

          {channel.userPosts?.map((post) => (
            <div
              key={post._id}
              className="rounded-xl overflow-hidden hover:scale-[1.02] transition cursor-pointer"
              onClick={() => handlePostClick(post._id)}
            >
              <img
                src={post.postFile}
                className="rounded-xl w-full object-cover"
              />

              <div className="p-3 flex justify-between items-center">
                <p>{post.title}</p>

                <GoArrowUpRight className="cursor-pointer text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white" />
              </div>
            </div>
          ))}

        </div>
      )}

      {activeTab === "likedPosts" && (
        <LikedPostsComponent channelId={`${channel._id}`} />
      )}

      {followersTab === true && (
        <Followers
          userId={channel._id}
          closeFollowersTab={() => setFollowersTab(false)}
        />
      )}

      {followingTab === true && (
        <Following
          userId={channel._id}
          closeFollowingTab={() => setFollowingTab(false)}
        />
      )}

    </div>
  );
};

export default Channel;