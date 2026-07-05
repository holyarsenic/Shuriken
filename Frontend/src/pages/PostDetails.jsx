import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegComment, FaHeart, FaRegHeart } from "react-icons/fa";
import { Post } from "../context/specificPost.jsx";
import { HomePage } from "../context/homePost.jsx";
import { useNavigate } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";

const PostDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const {posts, fetchPosts} = HomePage();

  const { post, loading, fetchPostById, toggleLike ,animate} = Post();

  useEffect(() => {
    fetchPostById(postId);
    fetchPosts();
    },[postId,fetchPostById, fetchPosts]);

  

    if (loading) {
    return (
      <div className="min-h-screen ml-64 mt-20 flex items-center justify-center bg-[#0B0A10]">
        <div className="flex">
          <span className="w-10 h-10 rounded-full border-4 border-slate-600 border-t-violet-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen ml-64 mt-20 flex items-center justify-center bg-[#0B0A10]">
        <p className="text-slate-400 text-sm">Post not found</p>
      </div>
    );
  }

   function handlePostClick(postId) {
      navigate(`/post/${postId}`);
    }


  return (
    <div className="min-h-screen ml-64 mt-18 bg-[#0B0A10] text-white p-5">

      <div className="bg-[#121018]/80 border border-[#2A2438] rounded-2xl p-5 max-w-8xl flex gap-10 items-start">

        <div className="w-155 h-155 flex items-center justify-center overflow-hidden bg-[#0E0D13] rounded-xl border border-[#211D2C]">
          <img
            src={post.postFile}
            alt={post.title}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="w-1/2 flex flex-col">

          <div className="flex items-center gap-3 pb-4 border-b border-[#221E2C]">

            <img
              src={post.owner?.avatar}
              className="w-12 h-12 rounded-full object-cover"
            />

            <div className="flex-1">
              <h2 className="font-semibold text-sm">
                {post.owner?.fullName}
              </h2>

              <p className="text-xs text-slate-500">
                @{post.owner?.userName}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h1 className="text-lg font-bold tracking-tight">
              {post.title}
            </h1>

            <p className="text-sm text-slate-400 mt-2">
              {post.description}
            </p>
          </div>

          <div className="flex mt-4 text-sm text-slate-500 font-medium">
            <span>{post.views || 0} views</span>
          </div>

          <div className="flex items-center gap-3 mt-4 pb-5 border-b border-[#221E2C]">

            <div className="flex items-center gap-2 bg-[#17141F] border border-[#2A2438] rounded-full pl-3 pr-4 py-1.5">
              <button
                onClick={() => toggleLike(post._id)}
                className="transition cursor-pointer"
              >
                {post.isLiked? (
                  <FaHeart className={`text-lg text-rose-500 transition-all duration-300 ${ animate ? "scale-125" : "scale-100"}`}/>
                ) : (
                  <FaRegHeart className="text-lg text-slate-300 hover:text-rose-400 transition" />
                )}
            </button>
              <p className="text-sm text-slate-300 font-medium">
                {post.likes}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-[#17141F] border border-[#2A2438] rounded-full pl-3 pr-4 py-1.5">
                <button className="cursor-pointer transition text-slate-300 hover:text-violet-400">
                  <FaRegComment className="text-lg" />
                </button>
                <p className="text-sm text-slate-300 font-medium">
                    {post.likes}
                </p>
            </div>

          </div>
          
            <div className="mt-5 pt-1 flex flex-col flex-1 min-h-0">

              <div className="flex items-center gap-3">

                <img
                  src="https://i.pinimg.com/736x/cd/63/af/cd63afd8681787eef6a56fb0e929996d.jpg"
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-[#2A2438]"
                />

                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 bg-[#17141F] border border-[#2A2438] rounded-full px-4 py-2.5 text-sm outline-none focus:border-violet-500 transition placeholder:text-slate-500"
                />

                <button
                  className="px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 active:bg-violet-700 transition text-sm font-semibold cursor-pointer"
                >
                  Post
                </button>

              </div>

              <div className="mt-6 space-y-5 max-h-87.5 overflow-y-auto pr-2">

                <div className="flex gap-3">

                  <img
                    src="https://i.pinimg.com/736x/cd/63/af/cd63afd8681787eef6a56fb0e929996d.jpg"
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-[#2A2438]"
                  />

                  <div className="flex-1">

                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">
                        Rohan
                      </h3>

                      <span className="text-xs text-slate-600">
                        2h
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 mt-1">
                      Amazing design 🔥 Love the purple theme.
                    </p>

                    <div className="flex items-center gap-4 mt-1.5">

                      <button className="text-xs text-slate-500 hover:text-white font-medium transition">
                        Reply
                      </button>

                      <button className="text-xs text-slate-500 hover:text-rose-400 font-medium transition">
                        Like
                      </button>

                    </div>

                  </div>

                </div>

                <div className="flex gap-3">

                  <img
                    src="https://i.pinimg.com/736x/cd/63/af/cd63afd8681787eef6a56fb0e929996d.jpg"
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-[#2A2438]"
                  />

                  <div className="flex-1">

                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">
                        Arman
                      </h3>

                      <span className="text-xs text-slate-600">
                        5h
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 mt-1 leading-snug">
                      Clean UI 👏
                    </p>

                    <div className="flex items-center gap-4 mt-1.5">

                      <button className="text-xs text-slate-500 hover:text-white font-medium transition">
                        Reply
                      </button>

                      <button className="text-xs text-slate-500 hover:text-rose-400 font-medium transition">
                        Like
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </div>

        </div>
      </div>

          <h2 className="text-sm font-semibold text-white uppercase mt-10 mb-4">
            Related
          </h2>

          <div className="columns-2 sm:columns-2 lg:columns-3 xl:columns-5 gap-5 space-y-5">
      
                {posts.map((post) => (
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

export default PostDetails;