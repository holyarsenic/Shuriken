import { GoArrowUpRight } from "react-icons/go";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HomePage } from "../context/homePost";

const Home = () => {
  const { posts, loading, fetchPosts } = HomePage();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0B0A10]">
        <div className="flex">
          <span className="w-10 h-10 rounded-full border-4 border-slate-300 dark:border-slate-600 border-t-violet-500 dark:border-t-violet-500 animate-spin" />
        </div>
      </div>
    );
  }

  function handlePostClick(postId) {
    navigate(`/post/${postId}`);
  }

  return (
    <>
      <div className="min-h-screen mt-5 lg:mt-24 ml-0 lg:ml-64 pb-20 lg:pb-6 px-3 md:px-6 lg:px-8 bg-gray-50 text-black dark:bg-[#0B0A10] dark:text-white">
        <div className="flex gap-3 text-sm mb-6">
          <h4 className="px-4 py-2 text-lg sm:text-xl border-b-2 border-black dark:border-white">
            Recents
          </h4>
        </div>

        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3 lg:gap-6 space-y-6">
          {posts.map((post) => (
            <div
              key={post._id}
              onClick={() => handlePostClick(post._id)}
              className="overflow-hidden rounded-xl cursor-pointer transition-transform hover:scale-[1.02]"
            >
              <img
                src={post.postFile}
                alt={post.title}
                className="w-full rounded-xl object-cover"
              />

              <div className="flex items-center justify-between p-3">
                <p className="truncate text-sm font-medium">
                  {post.title}
                </p>

                <GoArrowUpRight className="text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;