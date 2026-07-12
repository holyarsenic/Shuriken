import { useEffect } from "react";
import { Post } from "../context/specificPost";
import { EditPost } from "../context/editPost";


const EditPostPage = ({ postId, closeEdit }) => {

  const { post, loading, fetchPostById } = Post();

  const { deletePost } = EditPost();



  useEffect(() => {

    fetchPostById(postId);

  }, [postId, fetchPostById]);




  const deletingPost = async () => {

    const success = await  deletePost(postId);

    if(success){
      closeEdit();
    }

  };



  if(loading){

    return (

      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

        <div className="text-white">
          Loading...
        </div>

      </div>

    );

  }




  if(!post){

    return (

      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

        <div className="text-gray-400">
          Post not found
        </div>

      </div>

    );

  }




  return (

    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">


      <div className="bg-[#181622] border border-[#2A2438] rounded-2xl p-6 w-[500px]">


        <h2 className="text-white text-2xl font-bold mb-5">
          Edit Post
        </h2>



        {/* Current Media */}

        <div className="h-48 bg-black rounded-xl overflow-hidden mb-5">

          <img
            src={post.postFile}
            alt={post.title}
            className="w-full h-full object-cover"
          />

        </div>





        {/* Title */}

        <label className="text-gray-400 text-sm">
          Title
        </label>

        <input
          className="
          w-full mt-2 mb-4
          bg-[#121018]
          border border-[#2A2438]
          rounded-lg
          p-3
          text-white
          outline-none
          "
        />





        {/* Description */}

        <label className="text-gray-400 text-sm">
          Description
        </label>


        <textarea
          rows="4"

          className="
          w-full mt-2 mb-4
          bg-[#121018]
          border border-[#2A2438]
          rounded-lg
          p-3
          text-white
          outline-none
          resize-none
          "

        />

        <div className="flex justify-between mt-6">


          <button

            onClick={deletingPost}

            className="
            bg-red-500
            hover:bg-red-600
            text-white
            px-5
            py-2
            rounded-lg
            "

          >
            Delete
          </button>





          <div className="flex gap-3">


            <button

              onClick={closeEdit}

              className="
              bg-[#2A2438]
              text-white
              px-5
              py-2
              rounded-lg
              "

            >
              Cancel

            </button>




            <button
              className="
              bg-white
              text-black
              px-5
              py-2
              rounded-lg
              "

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