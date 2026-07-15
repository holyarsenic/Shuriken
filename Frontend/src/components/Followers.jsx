import { useEffect } from "react";
import { FollowList } from "../context/followList"
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";


const Followers = ({ userId, closeFollowersTab }) => {

  const {  fetchFollowers, followersData} = FollowList();
  const  navigate  = useNavigate();

  useEffect(() => {
    fetchFollowers(userId)
  },[userId,fetchFollowers])

    function handleChannelProfileClick(channelUsername) {
    navigate(`/c/${channelUsername}`)
  }

  return (
    <div className="fixed inset-0 ml-64 bg-[#0B0A10]/10 backdrop-blur-xs text-white flex items-center justify-center p-6 z-100">
      <div className="relative w-150 max-h-100 bg-[#2A2438] flex flex-col gap-4 items-center justify-center rounded-2xl p-6">
        <h2 className="font-bold text-xl mb-6">Followers</h2>

        <div className=" w-full max-h-90 flex flex-col gap-4 items-center overflow-scroll">
        
          {followersData.length === 0 ? (
              <p className="text-gray-400">No follow users</p>
          ):(
                followersData.map((user) => (
                  <div key={user.follower._id} 
                    className="w-full mb-5 flex items-center justify-between">

                    <div className="text-white flex gap-3 items-center cursor-pointer" 
                      onClick={() => handleChannelProfileClick(user.follower.userName)}>
                        <img src={user.follower.avatar} className="w-13 h-13 rounded-full object-cover"/>
                        <div className="flex flex-col">
                          <span className="text-md text-white">{user.follower.fullName}</span>
                          <span className="text-sm text-gray-300">@{user.follower.userName}</span>
                        </div>
                    </div> 

                    <button className="text-center px-5 py-2 rounded-xl cursor-pointer bg-violet-500">Follow</button>
                  </div> 
                ))
              )}
         </div> 

                <RxCross1 className="absolute top-0 right-4 cursor-pointer"
              onClick={closeFollowersTab}/>
      </div>
    </div>
  )
}

export default Followers
