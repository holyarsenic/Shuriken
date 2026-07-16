import { useEffect, useState } from "react";
import { Post } from "../context/specificPost";
import { EditPost } from "../context/editPost";
import { DashboardPage } from "../context/dashboardStats";


const EditPostPage = ({ postId, closeEdit }) => {

  const { post, loading, fetchPostById } = Post();
  const { deletePost, deleting ,editPost, editing} = EditPost();
  const { fetchPostDashboard, fetchDashboardStats } = DashboardPage();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchPostById(postId);
  }, [postId, fetchPostById]);


  const deletingPost = async () => {
    const success = await deletePost(postId);

    if(success){

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
        <div className="min-h-screen flex items-center justify-center bg-[#0B0A10]">
          <div className="flex">
            <span className="w-10 h-10 rounded-full border-4 border-slate-600 border-t-violet-500 animate-spin" />
          </div>
        </div>
    );
  }


  if(!post){
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

        <div className="text-gray-400">
          Page not found
        </div>

      </div>

    );

  }

  return (

    <div className="fixed inset-0 ml-64 bg-[#0B0A10]/10 backdrop-blur-sm text-white flex items-center justify-center">


      <div className="bg-[#181622] border border-[#2A2438] rounded-2xl p-6 w-170 h-120 flex flex-col overflow-hidden">
        <h2 className="text-white text-2xl font-bold flex-1">
          Edit Post
        </h2>

          <div className="flex gap-4">
            <div className="h-70 bg-black overflow-hidden mb-5 w-70 flex items-center justify-center">

              <img
                src={post.postFile}
                alt={post.title}
                className="w-full h-full object-contain"
              />

            </div>

              <div className="flex flex-col gap-4 flex-1 text-white">

                <div>
                  <label className="text-md text-white">Title</label>
                  <input
                    type="text"
                    defaultValue={post?.title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Your Post Title..."
                    className="w-full mt-2 p-3 placeholder:text-gray-400 bg-black border border-[#1B1728] rounded-lg outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="text-md text-white">Description</label>
                  <textarea
                    rows="4"
                    maxLength={150}
                    defaultValue={post?.description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write something..."
                    className="resize-none w-full mt-2 p-3 bg-black border placeholder:text-gray-400 border-[#1B1728] rounded-lg outline-none focus:border-violet-500"
                  />
                </div>
            </div>
          </div>
          <div className="flex justify-between mt-6">

                <button
                  onClick={deletingPost}
                  className=" bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg">
                  Delete Post
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={closeEdit}
                    className="bg-[#2A2438] text-white px-5 py-2 rounded-lg">
                    Cancel
                  </button>

                  <button className="bg-white text-black px-5 py-2 rounded-lg"
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