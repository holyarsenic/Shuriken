import { useState, useEffect } from "react"
import { CiSearch } from "react-icons/ci";
import { HomePage } from "../context/homePost";
import axios from "axios";

const SearchBar = () => {

  const [ search, setSearch] = useState("");
  const [ searchUser, setSearchUser] = useState([]);


  const {posts, fetchPosts} = HomePage();

  useEffect(() => {
    const fetchSearch = async () => {

    if (!search.trim()) {
      setSearchUser([]);
      return;
    }


      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/posts/search",
          {
            params: {
              query: search
            },
            withCredentials: true
          }
        );

        setSearchUser(res.data.data);
        
      } catch (error) {
        console.log(error.message);
      }
    };

   fetchSearch(); 

  }, [search]);

  useEffect( () => {
    fetchPosts();
  },[fetchPosts])

  const result = search.trim()
    ? posts.filter((post) =>
        post.title?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const searching = searchUser;

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
          (result.length > 0 || searching.length > 0) && (
           <div className="fixed w-1/2 top-20 bg-[#2d2944] flex-col text-white items-center justify-center py-10 px-4">
            {
              searching.map((user) => (
                 <div key={user._id} className="text-white flex gap-3 items-center mb-10">
                  <img src={user.avatar} className="w-13 h-13 rounded-full object-cover"/>
                  <div className="">
                   <span className="">@{user.userName}</span>
                   <span className="">{user.fullName}</span>
                  </div>
                </div>  
              ))
            }
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
