import Navbar from "../components/Navbar";
import { HiDotsHorizontal } from "react-icons/hi";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/posts",
          { withCredentials: true }
        );

        setPosts(res.data.data.posts);
      } catch (error) {
        console.log("ERROR:", error.response?.data || error.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen ml-16 px-6 py-6 bg-[#0f172a] text-white">

        <div className="flex gap-3 text-sm mb-6">
          <h4 className="px-4 py-2 bg-[#1f2937] rounded-full cursor-pointer hover:bg-[#374151] transition">
            All
          </h4>
          <h4 className="px-4 py-2 bg-[#1f2937] rounded-full cursor-pointer hover:bg-[#374151] transition">
            Your Posts
          </h4>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-[#111827] rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition"
            >

              <img
                src={post.postFile}
                alt={post.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-3 flex justify-between items-center">
                <p className="text-sm font-medium truncate">
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