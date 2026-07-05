import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegComment, FaHeart, FaRegHeart } from "react-icons/fa";
import { Post } from "../context/specificPost.jsx";

const PostDetails = () => {
  const { postId } = useParams();

  const { post, loading, fetchPostById, toggleLike ,animate} = Post();

  useEffect(() => {
    fetchPostById(postId);
    },[postId]);

  if (loading) {
    return (
      <div className="text-white ml-64 mt-20 p-6">
        Loading post...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-white ml-64 mt-20 p-6">
        Post not found
      </div>
    );
  }


  return (
    <div className="min-h-screen ml-64 mt-18 bg-[#0B0A10] text-white px-8 py-8">

      <div className="border border-gray-600 rounded-xl p-4 max-w-8xl mx-auto flex gap-10 items-start">

        <div className="w-155 h-155 flex items-center justify-center overflow-hidden bg-[#111116]">
          <img
            src={post.postFile}
            alt={post.title}
            className="w-full full object-contain"
          />
        </div>

        <div className="w-1/2 flex flex-col">

          <div className="flex items-center gap-4 pb-2 border-b border-[#2A2438]">

            <img
              src={post.owner?.avatar}
              className="w-14 h-14 rounded-full object-cover"
            />

            <div>
              <h2 className="font-semibold text-sm">
                {post.owner?.fullName}
              </h2>

              <p className="text-xs text-slate-400">
                @{post.owner?.userName}
              </p>
            </div>
          </div>

          <div className="mt-3">
            <h1 className="text-md font-bold">
              {post.title}
            </h1>

            <p className="text-sm text-slate-300 mt-2">
              {post.description}
            </p>
          </div>

          <div className="flex mt-3 text-sm text-slate-400">
            <span>{post.views || 0} Views</span>
          </div>

          <div className="flex items-center gap-6 mt-3">

            <div className="flex gap-2">
              <button
                onClick={() => toggleLike(post._id)}
                className="transition cursor-pointer"
              >
                {post.isLiked? (
                  <FaHeart className={`text-3xl text-red-500 transition-all duration-300 ${ animate ? "scale-125" : "scale-100"}`}/>
                ) : (
                  <FaRegHeart className="text-3xl text-white" />
                )}
            </button>
              <p className="text-gray-400 mt-1">
                {post.likes}
              </p>
            </div>

            <div className="flex gap-2">
                <button className="cursor-pointer transition">
                  <FaRegComment className="text-3xl" />
                </button>
                <p className="text-gray-400 mt-1">
                    {post.likes}
                </p>
            </div>

          </div>
          
            <div className="mt-4 border-t border-[#2A2438] pt-6">

              <div className="flex items-center gap-3">

                <img
                  src="https://i.pinimg.com/736x/cd/63/af/cd63afd8681787eef6a56fb0e929996d.jpg"
                  className="w-11 h-11 rounded-full object-cover"
                />

                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 bg-[#16131E] border border-[#2A2438] rounded-full px-5 py-3 outline-none focus:border-violet-600 transition"
                />

                <button
                  className="px-6 py-3 rounded-full bg-violet-700 hover:bg-violet-800 transition font-medium cursor-pointer"
                >
                  Post
                </button>

              </div>

              <div className="mt-8 space-y-6 max-h-87.5 overflow-y-auto pr-2">

                <div className="flex gap-3">

                  <img
                    src="https://i.pinimg.com/736x/cd/63/af/cd63afd8681787eef6a56fb0e929996d.jpg"
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div className="flex-1">

                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">
                        Rohan
                      </h3>

                      <span className="text-xs text-slate-500">
                        2h
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 mt-1">
                      Amazing design 🔥 Love the purple theme.
                    </p>

                    <div className="flex items-center gap-5 mt-2">

                      <button className="text-xs text-slate-500 hover:text-white transition">
                        Reply
                      </button>

                      <button className="text-xs text-slate-500 hover:text-red-400 transition">
                        Like
                      </button>

                    </div>

                  </div>

                </div>

                <div className="flex gap-3">

                  <img
                    src="https://i.pinimg.com/736x/cd/63/af/cd63afd8681787eef6a56fb0e929996d.jpg"
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div className="flex-1">

                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">
                        Arman
                      </h3>

                      <span className="text-xs text-slate-500">
                        5h
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 mt-1">
                      Clean UI 👏
                    </p>

                    <div className="flex items-center gap-5 mt-2">

                      <button className="text-xs text-slate-500 hover:text-white transition">
                        Reply
                      </button>

                      <button className="text-xs text-slate-500 hover:text-red-400 transition">
                        Like
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </div>

        </div>
      </div>

      <div className="">

      </div>
    </div>
  );
};

export default PostDetails;