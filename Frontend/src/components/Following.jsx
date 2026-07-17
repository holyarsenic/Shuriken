import { useState, useEffect } from "react";
import { FollowList } from "../context/followList";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ProfileData } from "../context/userProfile";
import { ChannelData } from "../context/channelProfile";

const Following = ({ userId, closeFollowingTab }) => {
  const { fetchFollowing, followingData, toggleFollowFromList } = FollowList();
  const { fetchProfile } = ProfileData();
  const { fetchChannelId } = ChannelData();

  const [isChanged, setIsChanged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFollowing(userId);
  }, [userId, fetchFollowing]);

  function handleChannelProfileClick(channelUsername) {
    navigate(`/c/${channelUsername}`);
  }

  const handleFollow = async (channelId) => {
    await toggleFollowFromList(channelId);
    await fetchFollowing(userId);

    setIsChanged(true);
  };

  const handleTabClosing = async () => {
    if (isChanged) {
      fetchProfile(false);
      fetchChannelId(userId, false);
    }

    closeFollowingTab();
  };

  return (
    <div className="fixed inset-0 ml-64 bg-black/20 dark:bg-[#0B0A10]/10 backdrop-blur-xs text-black dark:text-white flex items-center justify-center p-6 z-100">

      <div className="relative w-150 max-h-100 bg-white dark:bg-[#2A2438] flex flex-col gap-4 items-center justify-center rounded-2xl p-6 border border-gray-300 dark:border-[#3B3449]">

        <h2 className="font-bold text-xl mb-6">
          Following
        </h2>

        <div className="w-full max-h-90 flex flex-col gap-4 items-center overflow-scroll">

          {followingData.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              No following users
            </p>
          ) : (
            followingData.map((user) => (
              <div
                key={user.channel._id}
                className="w-full mb-5 flex items-center justify-between"
              >
                <div
                  className="flex gap-3 items-center cursor-pointer"
                  onClick={() =>
                    handleChannelProfileClick(user.channel.userName)
                  }
                >
                  <img
                    src={user.channel.avatar}
                    className="w-13 h-13 rounded-full object-cover"
                  />

                  <div className="flex flex-col">
                    <span className="text-md text-black dark:text-white">
                      {user.channel.fullName}
                    </span>

                    <span className="text-sm text-gray-500 dark:text-gray-300">
                      @{user.channel.userName}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleFollow(user.channel._id)}
                  className={`px-5 py-2 rounded-xl cursor-pointer text-white ${
                    user.channel.isFollowed
                      ? "bg-[#58555e]"
                      : "bg-violet-500"
                  }`}
                >
                  {user.channel.isFollowed ? "Following" : "Follow"}
                </button>
              </div>
            ))
          )}
        </div>

        <FaArrowLeftLong
          className="absolute text-xl top-7 left-10 cursor-pointer text-black dark:text-white"
          onClick={() => handleTabClosing()}
        />

      </div>
    </div>
  );
};

export default Following;