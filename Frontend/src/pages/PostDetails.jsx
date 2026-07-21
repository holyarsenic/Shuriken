import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegComment, FaHeart, FaRegHeart } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Post } from "../context/specificPost.jsx";
import { HomePage } from "../context/homePost.jsx";
import { useNavigate } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import Comments from "../components/Comments.component.jsx";
import RespCommentBox from "../components/ResponsiveComponents/RespCommentBox.jsx";

const PostDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { posts, fetchPosts } = HomePage();
  const { post, loading, fetchPostById, toggleLike, animate } = Post();

  const [ commentBox, setCommentBox ] = useState(false);

  useEffect(() => {
    fetchPostById(postId);
    fetchPosts();
  }, [postId, fetchPostById, fetchPosts]);

  useEffect(() => {
    const handleClick = () => {
      setCommentBox(false);
    };

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

   if (loading) {
    return (
       <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-[#0B0A10]">
        <div className="flex">
          <span className="w-7 h-7 lg:w-10 lg:h-10 rounded-full border-2 lg:border-4 border-slate-300 dark:border-slate-600 border-t-violet-500 dark:border-t-violet-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen ml-64 mt-20 flex items-center justify-center bg-white dark:bg-[#0B0A10]">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Post not found
        </p>
      </div>
    );
  }

  function handlePostClick(postId) {
    navigate(`/post/${postId}`);
  }

  function handleChannelProfileClick(channelUsername) {
    navigate(`/c/${channelUsername}`);
  }

  return (
    <div className="min-h-screen ml-0 lg:ml-64 mt-4 lg:mt-18 bg-white text-black dark:bg-[#0B0A10] dark:text-white p-2 lg:p-5">

      <div className="relative bg-white border border-gray-300 dark:bg-[#121018]/80 dark:border-[#2A2438] rounded-2xl p-2 lg:p-5 max-w-8xl flex flex-col lg:flex-row gap-3 lg:gap-10 items-start">

        <FaArrowLeftLong 
        onClick={() => navigate(-1)}
        className="absolute left-4 top-4 lg:top-8 text-4xl lg:text-5xl lg:left-8 p-2 bg-violet-400 lg:bg-transparent backdrop-blur-2xl text-gray-500 dark:text-white rounded-full cursor-pointer"/>

        <div className="h-86 w-full lg:w-145 lg:h-145 flex items-center justify-center overflow-hidden bg-gray-200 border border-gray-300 dark:bg-[#0E0D13] dark:border-[#211D2C] rounded-xl">
          <img
            src={post.postFile}
            alt={post.title}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="lg:w-1/2 flex flex-col">

          <div className="lg:hidden flex mb-2 ml-2 lg:mt-4 text-sm text-slate-500 font-medium">
            <span>{post.views || 0} views</span>
          </div>

          <div className="flex lg:hidden items-center gap-3 lmt-4 pb-5 border-b border-gray-300 dark:border-[#221E2C]">

            <div className="flex items-center gap-2 pl-3 pr-4 py-1.5">
              <button
                onClick={() => toggleLike(post._id)}
                className="transition cursor-pointer"
              >
                {post.isLiked ? (
                  <FaHeart
                    className={`text-2xl text-rose-500 transition-all duration-300 ${
                      animate ? "scale-125" : "scale-100"
                    }`}
                  />
                ) : (
                  <FaRegHeart className="text-2xl text-slate-500 dark:text-slate-300 hover:text-rose-400 transition" />
                )}
              </button>

              <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                {post.likes}
              </p>
            </div>

            <div className="flex items-center gap-2 pl-3 pr-4 py-1.5"
            onClick={(e) => {
               e.stopPropagation();
              setCommentBox(true)}}
            >
              <button className="cursor-pointer transition text-slate-500 dark:text-slate-300 hover:text-violet-400">
                <FaRegComment className="text-2xl" />
              </button>

              <p className="text-sm text-slate-700 dark:text-slate-300 font-medium"
              >
                {post.comments || 0}
              </p>
            </div>

          </div>

          <div
            className="flex items-center gap-3 pb-4 border-b border-gray-300 dark:border-[#221E2C] cursor-pointer"
            onClick={() => {
              handleChannelProfileClick(post.owner.userName);
            }}
          >
            <img
              src={post.owner.avatar}
              className="w-7 h-7 lg:w-12 lg:h-12 rounded-full object-cover"
            />

            <div className="flex-1">
              <h2 className="font-semibold text-xs lg:text-sm text-black dark:text-white">
                {post.owner.fullName}
              </h2>

              <p className="text-xs text-slate-500">
                @{post.owner.userName}
              </p>
            </div>
          </div>

          <div className="mt-2 lg:mt-4">
            <h1 className="text-base lg:text-lg font-bold tracking-tight text-black dark:text-white">
              {post.title}
            </h1>

            <p className="text-xs lg:text-sm text-slate-600 dark:text-slate-400 mt-1 lg:mt-2">
              {post.description}
            </p>
          </div>

          <div className="hidden lg:flex mt-4 text-sm text-slate-500 font-medium">
            <span>{post.views || 0} views</span>
          </div>

          <div className="hidden lg:flex items-center gap-3 mt-4 pb-5 border-b border-gray-300 dark:border-[#221E2C]">

            <div className="flex items-center gap-2 bg-white border border-gray-300 dark:bg-[#17141F] dark:border-[#2A2438] rounded-full pl-3 pr-4 py-1.5">
              <button
                onClick={() => toggleLike(post._id)}
                className="transition cursor-pointer"
              >
                {post.isLiked ? (
                  <FaHeart
                    className={`text-lg text-rose-500 transition-all duration-300 ${
                      animate ? "scale-125" : "scale-100"
                    }`}
                  />
                ) : (
                  <FaRegHeart className="text-lg text-slate-500 dark:text-slate-300 hover:text-rose-400 transition" />
                )}
              </button>

              <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                {post.likes}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white border border-gray-300 dark:bg-[#17141F] dark:border-[#2A2438] rounded-full pl-3 pr-4 py-1.5">
              <button className="cursor-pointer transition text-slate-500 dark:text-slate-300 hover:text-violet-400">
                <FaRegComment className="text-lg" />
              </button>

              <p className="text-sm text-slate-700 dark:text-slate-300 font-medium"
              >
                {post.comments || 0}
              </p>
            </div>

          </div>

          <Comments postId={postId}/>

        </div>
      </div>

      <h2 className="text-sm font-semibold text-black dark:text-white uppercase mt-8 mb-2 ml-1 lg:mt-10 lg:mb-4">
        Related
      </h2>

      <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3 lg:gap-6 space-y-6 mb-16">
        {posts.map((post) => (
          <div
            key={post._id}
            className="rounded-xl overflow-hidden hover:scale-[1.02] transition cursor-pointer"
            onClick={() => handlePostClick(post._id)}
          >
            <img
              src={post.postFile}
              alt={post.title}
              className="rounded-xl w-full object-cover"
            />

            <div className="p-1 lg:p-3 flex justify-between items-center">
              <p className="truncate text-xs lg:text-sm font-medium text-black dark:text-white">
                {post.title}
              </p>

              <HiDotsHorizontal className="cursor-pointer text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white" />
            </div>
          </div>
        ))}
      </div>


      {
        commentBox === true && (
          <RespCommentBox 
          postId={postId} 
          closeComment={() => setCommentBox(false)}/>
        )
      }
    </div>
  );
};

export default PostDetails;