import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegComment, FaHeart, FaRegHeart } from "react-icons/fa";
import { Post } from "../context/post.jsx";

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
    <div className="min-h-screen ml-64 mt-22 bg-[#0B0A10] text-white px-8 py-8">

      <div className="border border-gray-600 rounded-xl p-4 max-w-8xl mx-auto flex gap-10 items-start">

        <div className="w-155 h-130 overflow-hidden bg-[#111116]">
          <img
            src={post.postFile}
            alt={post.title}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="w-1/2 flex flex-col">

          <div className="flex items-center gap-4 pb-2 border-b border-[#2A2438]">

            <img
              src={post.owner?.avatar}
              className="w-14 h-14 rounded-full object-cover"
            />

            <div>
              <h2 className="font-semibold text-lg">
                {post.owner?.fullName}
              </h2>

              <p className="text-sm text-slate-400">
                @{post.owner?.userName}
              </p>
            </div>
          </div>

          <div className="mt-3">
            <h1 className="text-2xl font-bold">
              {post.title}
            </h1>

            <p className="text-slate-300 mt-2">
              {post.description}
            </p>
          </div>

          <div className="flex mt-3 text-sm text-slate-400">
            <span>{post.views || 0} Views</span>
          </div>

          <div className="flex gap-5 mt-3">

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
              <p className="text-gray-400 mt-3">
                {post.likes}
              </p>

            <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#16131E] hover:bg-[#24113F] transition">
              <FaRegComment className="text-2xl" />
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default PostDetails;