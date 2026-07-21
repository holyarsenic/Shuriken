import { useEffect, useState } from "react";
import { Post } from "../context/specificPost";
import { EditPost } from "../context/editPost";
import { DashboardPage } from "../context/dashboardStats";
import { FaArrowLeft } from "react-icons/fa6";

const EditPostPage = ({ postId, closeEdit }) => {
  const { post, loading, fetchPostById } = Post();
  const { deletePost, deleting, editPost, editing } = EditPost();
  const { fetchPostDashboard, fetchDashboardStats } = DashboardPage();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchPostById(postId);
  }, [postId, fetchPostById]);

  const deletingPost = async () => {
    const success = await deletePost(postId);

    if (success) {
      await fetchPostDashboard();
      await fetchDashboardStats();

      closeEdit();
    }
  };

  const saveChanges = async () => {
    const success = await editPost(postId, title, description);

    if (success) {
      await fetchPostDashboard();
      await fetchDashboardStats();

      closeEdit();
    }
  };

  if (loading || deleting || editing) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0B0A10]">
        <div className="flex">
          <span className="w-10 h-10 rounded-full border-4 border-slate-300 dark:border-slate-600 border-t-violet-500 dark:border-t-violet-500 animate-spin" />
        </div>
      </div>
    );
  }


  if (!post) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-gray-400">
          Page not found
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 ml-0 lg:ml-64 bg-black/2 dark:bg-[#0B0A10]/10 backdrop-blur-sm text-black dark:text-white flex items-center justify-center z-5">

      <div className=" bg-white dark:bg-[#181622] border border-gray-300 dark:border-[#2A2438] rounded-2xl pt-4 pb-8 px-3 lg:p-6 w-full h-140 lg:w-170 lg:h-120 flex flex-col overflow-scroll lg:overflow-hidden">

       <FaArrowLeft className="fixed lg:hidden text-black dark:text-white text-xl mb-2"
      onClick={closeEdit}
      />
        <h2 className="mt-6 text-lg lg:text-2xl font-bold flex-1 text-black dark:text-white">
          Edit Post
        </h2>

        <div className="flex flex-col lg:flex-row gap-4 mt-4 lg:mt-0">

          <div className="w-full lg:h-70 lg:w-70 flex items-center justify-center overflow-hidden mb-2 lg:mb-5 bg-gray-100 dark:bg-black">
            <img
              src={post.postFile}
              alt={post.title}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col gap-4 flex-1">

            <div>
              <label className="text-sm lg:text-base text-black dark:text-white">
                Title
              </label>

              <input
                type="text"
                defaultValue={post?.title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Your Post Title..."
                className="w-full mt-2 p-3 bg-gray-100 dark:bg-black border border-gray-300 dark:border-[#1B1728] rounded-lg outline-none focus:border-violet-500 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="text-sm lg:text-base text-black dark:text-white">
                Description
              </label>

              <textarea
                rows="4"
                maxLength={150}
                defaultValue={post?.description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write something..."
                className="resize-none w-full mt-2 p-3 bg-gray-100 dark:bg-black border border-gray-300 dark:border-[#1B1728] rounded-lg outline-none focus:border-violet-500 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </div>

          </div>

        </div>

        <div className="flex justify-between mt-3 lg:mt-6">

          <button
            onClick={deletingPost}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 lg:px-5 lg:py-2 rounded-lg text-sm lg:text-base"
          >
            Delete Post
          </button>

          <div className="flex gap-3">

            <button
              onClick={closeEdit}
              className="bg-gray-300 dark:bg-[#2A2438] text-black dark:text-white px-3 py-2 lg:px-5 lg:py-2 text-sm lg:text-base rounded-lg"
            >
              Cancel
            </button>

            <button
              className="bg-violet-700 hover:bg-violet-800 text-white px-3 py-2 lg:px-5 lg:py-2 rounded-lg text-sm lg:text-base"
              onClick={saveChanges}
            >
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default EditPostPage;