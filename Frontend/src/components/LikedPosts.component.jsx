import { useNavigate } from "react-router-dom";
import { LikedPostPage } from "../context/likedPosts";
import { useEffect } from "react";
import { GoArrowUpRight } from "react-icons/go";

const LikedPostsComponent = ({ channelId }) => {
  const navigate = useNavigate();

  const { likedPosts, loading, fetchLikedPosts } = LikedPostPage();

  useEffect(() => {
    if (channelId) {
      fetchLikedPosts(channelId);
    }
  }, [fetchLikedPosts, channelId]);

  if (loading) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0B0A10]">
        <div className="flex">
          <span className="w-10 h-10 rounded-full border-4 border-slate-300 dark:border-slate-600 border-t-violet-500 dark:border-t-violet-500 animate-spin" />
        </div>
      </div>
    );
  }

  function handlePostClick(PostId) {
    navigate(`/post/${PostId}`);
  }

  return (
    <div>
      <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3 lg:gap-6 space-y-6 mt-5 lg:mt-10">

        {likedPosts?.map((post) => (
          <div
            key={post.post._id}
            className="rounded-xl overflow-hidden hover:scale-[1.02] transition cursor-pointer"
            onClick={() => handlePostClick(post.post._id)}
          >
            <img
              src={post.post.postFile}
              alt={post.post.title}
              className="rounded-xl w-full object-cover"
            />

            <div className="p-3 flex justify-between items-center">
              <p className="text-black dark:text-white">
                {post.post.title}
              </p>

              <GoArrowUpRight className="cursor-pointer text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white" />
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default LikedPostsComponent;