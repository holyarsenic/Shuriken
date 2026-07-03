import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";

const PostDetails = () => {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/posts/${postId}`,
          { withCredentials: true }
        );

        setPost(res.data.data);
      } catch (error) {
        console.log("ERROR:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

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
    <div className="h-screen ml-64 mt-20 px-6 py-6 bg-[#0B0A10] text-white">
      <div className="w-[400px] h-[300px] bg-black rounded-xl flex items-center justify-center overflow-hidden">
        <img
          src={post.postFile}
          alt={post.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="mt-5 flex justify-between items-start">

        <div>
          <h1 className="text-2xl font-semibold">
            {post.title}
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            {post.views || 0} views
          </p>

          <div className="flex items-center gap-3 mt-4">
            <img
              src={post.owner?.avatar}
              alt={post.owner?.userName}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div>
              <p className="text-sm font-medium">
                {post.owner?.fullName}
              </p>
              <p className="text-xs text-white">
                @{post.owner?.userName}
              </p>
            </div>
          </div>
        </div>

        <HiDotsHorizontal className="cursor-pointer text-slate-400 hover:text-white" />
      </div>
          <div className="mt-8 border-t border-gray-700 pt-5 w-[400px]">
            <div className="flex items-center gap-6">

              <button className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-[#1a1a1f] transition">
                <CiHeart className="text-3xl" />
                <span className="text-sm text-slate-400">0</span>
              </button>

              <button className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-[#1a1a1f] transition">
                <FaRegComment className="text-2xl" />
                <span className="text-sm text-slate-400">0</span>
              </button>

            </div>
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Write a comment..."
                className="flex-1 px-3 py-2 rounded-lg bg-[#1a1a1f] text-white outline-none"
              />

              <button className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition">
                Post
              </button>
            </div>

            <div className="mt-4 space-y-3">

              <div className="bg-[#1a1a1f] p-3 rounded-lg">
                <p className="text-sm font-semibold">User1</p>
                <p className="text-sm text-slate-300">Nice post 🔥</p>
              </div>

              <div className="bg-[#1a1a1f] p-3 rounded-lg">
                <p className="text-sm font-semibold">User2</p>
                <p className="text-sm text-slate-300">Amazing 👌</p>
              </div>

            </div>

          </div>
    </div>
  );
};

export default PostDetails;