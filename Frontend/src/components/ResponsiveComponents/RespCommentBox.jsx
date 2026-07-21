import { UseComments } from "../../context/commentPage";
import { ProfileData } from "../../context/userProfile";
import { useState, useEffect } from "react";
import { Post } from "../../context/specificPost";
import { FaChevronDown } from "react-icons/fa";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";


const RespCommentBox = ({ postId, closeComment }) => {
  const { loading, comments, fetchComments, addComment, deleteComment } = UseComments();
  const { profile, fetchProfile } = ProfileData();
  const { fetchPostById } = Post()

  const [content, setContent] = useState("");

  useEffect(() => {
    fetchComments(postId);
  }, [fetchComments, postId]);

  useEffect(() => {
    fetchProfile(false);
  }, [fetchProfile]);

  const handleComment = async(postId, content) => {
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

  return (
    <div className="fixed top-40 left-1 right-1 bottom-0 flex mt-1 lg:hidden flex-col flex-1 h-full border border-gray-300 dark:border-gray-900 bg-white rounded-t-3xl dark:bg-[#0B0A10] px-4 pt-3 pb-5 transition-all ease-in-out"
    onClick={(e) => e.stopPropagation()}
    >

          <FaChevronDown className="w-full text-xl mb-4" onClick={closeComment}/>

          <div className="flex items-center gap-3">

            <img
              src={profile?.avatar}
              className="w-9 h-9 rounded-full object-cover"
            />

            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-gray-100 dark:bg-[#17141F] border border-gray-300 dark:border-[#2A2438] rounded-full px-4 py-2.5 text-sm outline-none focus:border-violet-500 transition placeholder:text-gray-500 dark:placeholder:text-slate-500 text-black dark:text-white"
            />

            <button
              className="px-3 py-2 rounded-full bg-violet-600 hover:bg-violet-500 active:bg-violet-700 transition text-white cursor-pointer"
              onClick={() => handleComment(postId, content)}
            >
              <PiPaperPlaneTiltFill className="text-lg" />
            </button>

          </div>

          {loading ? (
            <div className="h-full w-full flex mt-10 justify-center">
              <div className="flex">
                <span className="w-7 h-7 rounded-full border-2 lg:border-4 border-slate-300 dark:border-slate-600 border-t-violet-500 dark:border-t-violet-500 animate-spin" />
              </div>
            </div>
          ):(<div className="pt-1 flex flex-col flex-1 max-h-80 pb-4 overflow-scroll">

                  {comments.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-slate-500 mt-5">
                      No comments yet.
                    </p>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment._id} className="flex gap-3 mt-6">

                        <img
                          src={comment.owner.avatar}
                          className="w-6 h-6 lg:w-9 lg:h-9 rounded-full object-cover border border-gray-300 dark:border-gray-700"
                        />

                        <div className="flex-1">

                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-xs lg:text-sm text-black dark:text-white">
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

            </div>)}
    </div>
  );
};

export default RespCommentBox;