import { UseComments } from "../context/commentPage";
import { ProfileData } from "../context/userProfile";
import { useState, useEffect } from "react";
import { Post } from "../context/specificPost";
import { RxCross2 } from "react-icons/rx";

const Comments = ({ postId }) => {
  const { loading, comments, fetchComments, addComment, deleteComment } = UseComments();
  const { profile, fetchProfile } = ProfileData();
  const { fetchPostById } = Post()

  const [content, setContent] = useState("");

  useEffect(() => {
    fetchComments(postId);
  }, [fetchComments, postId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  async function handleComment(postId, content) {
    if (!content.trim()) return;

    await addComment(postId, content);
    setContent("");
    fetchPostById(postId,false);
  }

   const handleDelete = async (commentId) => {
    await deleteComment(commentId);
    await fetchComments(postId);
    await fetchPostById(postId, false);
  };


  if (loading) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0B0A10]">
        <div className="flex">
          <span className="w-10 h-10 rounded-full border-2 lg:border-4 border-slate-300 dark:border-slate-600 border-t-violet-500 dark:border-t-violet-500 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="hidden mt-1 lg:flex flex-col flex-1 min-h-82 border border-gray-300 dark:border-gray-900 px-4 pt-5 pb-1">

      <div className="flex items-center gap-3">

        <img
          src={profile?.avatar}
          className="w-9 h-9 rounded-full object-cover ring-1 ring-gray-300 dark:ring-[#2A2438]"
        />

        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-gray-100 dark:bg-[#17141F] border border-gray-300 dark:border-[#2A2438] rounded-full px-4 py-2.5 text-sm outline-none focus:border-violet-500 transition placeholder:text-gray-500 dark:placeholder:text-slate-500 text-black dark:text-white"
        />

        <button
          className="px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 active:bg-violet-700 transition text-sm font-semibold text-white cursor-pointer"
          onClick={() => handleComment(postId, content)}
        >
          Post
        </button>

      </div>

      <div className="mt-5 pt-1 flex flex-col flex-1 max-h-60 overflow-scroll">

        {comments.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-slate-500 mt-5">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="flex gap-3 mt-6">

              <img
                src={comment.owner.avatar}
                className="w-9 h-9 rounded-full object-cover border border-gray-300 dark:border-gray-700"
              />

              <div className="flex-1">

                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-black dark:text-white">
                    {comment.owner.userName}
                  </h3>

                  <span className="text-xs text-gray-500 dark:text-slate-600">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-sm text-gray-700 dark:text-slate-300 mt-1">
                  {comment.content}
                </p>

                <div className="flex items-center gap-4 mt-1.5">
                  <button className="text-xs text-gray-500 dark:text-slate-500 hover:text-rose-400 font-medium transition">
                    Like
                  </button>
                </div>
              </div>
                 {comment.owner._id === profile?._id && (
                       <button
                         onClick={() => handleDelete(comment._id)}
                         className="text-xs text-red-500 hover:text-red-600"
                       >
                        <RxCross2 className="text-lg text-black dark:text-white"/>
                        </button>
                 )}

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default Comments;