import { useState, useEffect } from "react"
import { CiSearch } from "react-icons/ci";
import { HomePage } from "../context/homePost";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {

  const [ search, setSearch] = useState("");
  const [ searchUser, setSearchUser] = useState([]);


  const {posts, fetchPosts} = HomePage();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearch = async () => {

    if (!search) {
      setSearchUser([]);
      return;
    }


      try {
        const res = await api.get(
          "/posts/search",
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

  const result = typeof search === "string" && search.trim()
    ? posts.filter((post) =>
        post.title
          ?.toLowerCase()
          .includes(search.toLowerCase())
      )
    : [];

   function handleChannelProfileClick(channelUsername) {
    navigate(`/c/${channelUsername}`)
    setSearchUser([]);
    setSearch([])
  }

  function handlePostView(postId) {
    navigate(`/post/${postId}`)
    setSearchUser([]);
    setSearch([])
  }

  const searching = searchUser;

  return (
    <div className="relative w-full lg:w-1/2 max-h-screen lg:max-h-200 overflow-scroll flex lg:items-center justify-center px-6 py-5 lg:p-0">
      <CiSearch className="absolute left-9 top-8 lg:left-4 lg:top-1/2 lg:-translate-y-1/2 text-xl text-gray-700 dark:text-white" />
    
        <input
          type="text"
          placeholder="Search..."
          className="w-full lg:w-full h-11 rounded-full
          bg-gray-200 dark:bg-[#151320]
          border border-gray-300 dark:border-white/60
          text-gray-900 dark:text-white
          pl-11 pr-4
          placeholder:text-gray-500 dark:placeholder:text-white/60
          focus:outline-none
          focus:border-violet-500
          transition"

          value={search}
          onChange={(e) => {setSearch(e.target.value)}}
        />

        {
          (result.length > 0 || searching.length > 0) && (
           <div className="fixed w-full lg:w-1/2 top-20 bg-[#2d2944] border border-[#3B0764] flex-col text-white rounded-xl items-center justify-center pt-10 pb-5 px-4 shadow-lg">
            {
              searching.map((user) => (
                 <div key={user._id} className="text-white flex gap-3 items-center mb-5 cursor-pointer" 
                 onClick={() => handleChannelProfileClick(user.userName)}>
                  <img src={user.avatar} className="w-7 h-7 lg:w-13 lg:h-13 rounded-full object-cover"/>
                  <div className="flex flex-col">
                   <span className="text-sm lg:text-base text-white">{user.fullName}</span>
                   <span className="text-xs lg:text-sm text-gray-300">@{user.userName}</span>
                  </div>
                </div>  
              ))
            }
            {
              result.map((post) => (
                <div key={post._id} className="text-white text-sm lg:text-lg mb-2 ml-2 flex gap-2 items-center cursor-pointer hover:text-violet-400"
                onClick={()=> handlePostView(post._id)}
                >
                 <CiSearch/> {post.title}
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
