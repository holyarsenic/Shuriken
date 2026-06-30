import Navbar from "../components/Navbar"
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
      <Navbar/>
      <div className="h-full mt-22 ml-17 px-4 py-4">
        <div className="flex gap-3 text-xl ml-5">
          <h4 className="px-4 py-2 bg-[#111] text-white rounded-3xl">All</h4>
          <h4 className="px-4 py-2 bg-[#111] text-white rounded-3xl">Your Posts</h4>
        </div>

        <div className="h-full w-full columns-2 sm:columns-2 md:columns-3 lg:columns-5 xl:columns-6 gap-1 sm:gap-1 md:gap-2 lg:gap-4 xl:gap-4 pt-4 object-contain">
          {posts.map((post) => (
          <div key={post._id} className="mb-4 overflow-hidden rounded-xl">
            <img
              src={post.postFile}
              alt={post.title}
              className="w-full mb-2 object-cover rounded-xl"
            />
            <div className="px-1 flex justify-between w-full">
              <p className="text-md font-medium">{post.title}</p>
              <HiDotsHorizontal/>
            </div>
          </div>
        ))}

        </div>

        
      </div>
    </>
  )
}

export default Home
