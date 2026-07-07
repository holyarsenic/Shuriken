import { ProfileData } from "../context/userProfile";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();

  const { fetchProfile, profile, loading } = ProfileData();

    useEffect(() => {
      fetchProfile();
    }, [fetchProfile]);

    if (loading || !profile) {
      return (
        <div className="min-h-screen ml-64 mt-20 flex items-center justify-center bg-[#0B0A10]">
          <div className="w-10 h-10 border-4 border-slate-600 border-t-violet-500 rounded-full animate-spin" />
        </div>
      );
    }
  function handlePostClick(PostId){
    navigate(`/post/${PostId}`)
  }

  return (
    <div className="min-h-screen ml-64 mt-20 px-8 py-8 bg-[#0B0A10] text-white">
      <div className="border border-[#2A2438] rounded-2xl bg-[#14141C] p-8">

        <div className="flex items-center gap-10">
          <img
            src={profile.avatar}
            className="w-40 h-40 rounded-full object-cover border border-gray-800"
          />
          <div className="flex-1">

            <div className="flex items-center gap-5">

              <h1 className="text-2xl font-medium">
                @{profile.userName}
              </h1>

              <button className="px-5 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#7C3AED] transition">
                Edit Profile
              </button>

            </div>

            <div className="flex gap-10 mt-8">

              <div>
                <p className="text-2xl font-bold">{profile.totalPosts}</p>
                <p className="text-slate-400">Posts</p>
              </div>

              <div>
                <p className="text-2xl font-bold">{profile.followersCount}</p>
                <p className="text-slate-400">Followers</p>
              </div>

              <div>
                <p className="text-2xl font-bold">{profile.followingCount}</p>
                <p className="text-slate-400">Following</p>
              </div>

            </div>

            <div className="mt-8">

              <h2 className="text-xl font-semibold">
                {profile.fullName}
              </h2>

              <p className="text-slate-400 mt-2">
                Full Stack Web Developer {profile.bio}
              </p>
            </div>

          </div>

        </div>
      </div>

      <div className="mt-10 border-t border-[#2A2438]" />

      <div className="flex items-start gap-12 mt-6">

        <button className="pb-3 border-b-2 border-[#7C3AED] font-semibold">
          YOUR POSTS
        </button>

        <button className="pb-3 text-slate-400 hover:text-white transition">
          WATCH HISTORY
        </button>

      </div>

      <div className="columns-2 sm:columns-2 lg:columns-4 xl:columns-5 gap-6 space-y-6 mt-10">

        {profile.myPosts.map((post) => (
                    <div
                      key={post._id}
                      className="rounded-xl overflow-hidden hover:scale-[1.02] transition"
                      onClick={() => handlePostClick(post._id)}
                    >
        
                      <img
                        src={post.postFile}
                        alt={post.title}
                        className="rounded-xl w-full object-cover"
                      />
        
                      <div className="p-3 flex justify-between items-center">
                        <p className="text-sm font-medium">
                          {post.title}
                        </p>
        
                        <HiDotsHorizontal className="cursor-pointer text-slate-400 hover:text-white" />
                      </div>
                    </div>
                  ))}

      </div>

    </div>
  );
};

export default Profile;
