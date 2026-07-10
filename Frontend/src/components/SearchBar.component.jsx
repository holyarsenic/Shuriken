import { useState, useEffect } from "react"
import { CiSearch } from "react-icons/ci";
import { HomePage } from "../context/homePost";

const SearchBar = () => {

  const [ search, setSearch] = useState("");

  const {posts, fetchPosts} = HomePage();

  useEffect( () => {
    fetchPosts();
  },[fetchPosts])

 const result = search.trim()
  ? posts.filter((post) =>
      post.title?.toLowerCase().includes(search.toLowerCase()) ||
      post.owner?.userName?.toLowerCase().includes(search.toLowerCase())
    )
  : [];


  return (
    <div className="relative w-1/2 flex items-center justify-center">
      <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-white" />
    
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-11 rounded-full
          bg-[#151320]
          border border-white/60
          text-white
          pl-11 pr-4
          placeholder:text-white/60
          focus:outline-none
          focus:border-violet-500
          transition"

          value={search}
          onChange={(e) => {setSearch(e.target.value)}}
        />

        {
          result.length > 0 && (
           <div className="fixed w-1/2 top-20 bg-[#0B0A10] flex-col text-white items-center justify-center">
            {
              result.map((post) => (
                <div key={post._id} className="text-white">
                {post.title}
                </div>  
              ))
            }
           </div>  
          )
        }
    </div>
  )
}

export default SearchBar
