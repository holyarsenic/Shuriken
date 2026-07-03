import { HiDotsHorizontal } from "react-icons/hi";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/posts/",
          { withCredentials: true }
        );

        setPosts(res.data.data.posts);
      } catch (error) {
        console.log("ERROR:", error.response?.data || error.message);
      }
    };

    fetchPosts();
  }, []);

    function handlePostClick(postId) {
      navigate(`/post/${postId}`);
    }

  return (
    <>
      <div className="min-h-screen ml-64 mt-20 px-6 py-6 bg-[#0B0A10] text-white">

        <div className="flex gap-3 text-sm mb-6">
          <h4 className="px-4 py-2 cursor-pointer text-xl hover:border-b-2 transition">
            All
          </h4>
          <h4 className="px-4 py-2 cursor-pointer text-xl hover:border-b-2 transition">
            Your Posts
          </h4>
        </div>

        <div className="columns-2 sm:columns-2 lg:columns-3 xl:columns-5 gap-6 space-y-6">

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
    </>
  );
};

export default Home;