import { ProfileData } from "../context/userProfile";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LikedPostsComponent from "../components/LikedPosts.component";
import EditProfilePage from "../components/EditProfilePage";
import Followers from "../components/Followers";
import Following from "../components/Following";

const Profile = () => {
  const navigate = useNavigate();

  const { fetchProfile, profile, loading } = ProfileData();

  const [activeTab,setActiveTab] = useState("posts");
  const [ editProfile, setEditProfile ] = useState(false);
  const [ followersTab, setFollowersTab ] = useState(false);
  const [ followingTab, setFollowingTab ] = useState(false);

    useEffect(() => {
      fetchProfile();
    }, [fetchProfile]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B0A10]">
          <div className="flex">
            <span className="w-10 h-10 rounded-full border-4 border-slate-600 border-t-violet-500 animate-spin" />
          </div>
        </div>
      );
    }

    if (!profile) {
      return (
        <div className="min-h-screen ml-64 mt-20 flex items-center justify-center bg-[#0B0A10]">
          <p className="text-slate-400 text-sm">Post not found</p>
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

              <button className="px-5 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#7C3AED] transition"
              onClick={() => setEditProfile(true)}
              >
                Edit Profile
              </button>

            </div>

            <div className="flex gap-10 mt-8">

              <div>
                <p className="text-2xl font-bold">{profile.totalPosts}</p>
                <p className="text-slate-400">Posts</p>
              </div>

              <div
              onClick={() => setFollowersTab(true)}
              >
                <p className="text-2xl font-bold">{profile.followersCount}</p>
                <p className="text-slate-400">Followers</p>
              </div>

              <div
              onClick={() => setFollowingTab(true)}
              >
                <p className="text-2xl font-bold">{profile.followingCount}</p>
                <p className="text-slate-400">Following</p>
              </div>

            </div>

            <div className="mt-8">

              <h2 className="text-xl font-semibold">
                {profile.fullName}
              </h2>

              <p className="text-slate-400 mt-2">
                {profile.bio}
              </p>
            </div>

          </div>

        </div>
      </div>

      <div className="mt-10 border-t border-[#2A2438]" />

      <div className="flex items-start gap-12 mt-6">

        <button 
        onClick={()=>setActiveTab("posts")}
        className={`pb-3 font-semibold ${activeTab === "posts"?"border-b-2 border-[#7C3AED]":"text-slate-400"  }`}>
          YOUR POSTS
        </button>

        <button 
        onClick={()=> setActiveTab("likedPosts")}
        className={`pb-3 font-semibold ${activeTab === "likedPosts"?"border-b-2 border-[#7C3AED]":"text-slate-400"}`}>
          LIKED
        </button>

      </div>

      { activeTab === "posts" && (
        
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

      </div>)}

      { activeTab === "likedPosts" && (
        <LikedPostsComponent channelId= {`${profile._id}`}/>
        )}


        { editProfile === true && (
        <EditProfilePage closeProfileEdit={() => setEditProfile(false)}/>
        )}

        { followersTab === true && (
        <Followers userId={profile._id} closeFollowersTab={() => setFollowersTab(false)}/>
        )}
        
        { followingTab === true && (
        <Following userId={profile._id} closeFollowingTab={() => setFollowingTab(false)}/>
        )}

    </div>
  );
};

export default Profile;
