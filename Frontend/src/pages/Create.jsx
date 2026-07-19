import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import axios from "axios";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const publishPost = async () => {
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("postFile", file);

      const res = await axios.post(
        `http://localhost:8000/api/v1/posts/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("Upload success:", res.data);
      setTitle("");
      setDescription("");
      setFile(null);
      alert("Post published successfully!");
    } catch (error) {
      console.log("Upload failed:", error.message);
    }
  };

  return (
    <div className="h-screen w-auto ml-0 mt-20 lg:mt-0 lg:ml-64 bg-white dark:bg-[#0B0A10] text-black dark:text-white flex items-center justify-center">

      <div className="w-full max-w-5xl mb-30 lg:mb-0 lg:w-1/2 bg-white dark:bg-[#151320] rounded-2xl lg:mr-50 border border-gray-300 dark:border-[#3B0764] p-5 lg:p-8">

        <h1 className="text-xl lg:text-2xl font-bold mb-6">
          Create Post
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-82">

          <label className="relative flex flex-col items-center justify-center cursor-pointer w-full h-60 lg:w-1/2 lg:h-full text-black dark:text-white rounded-xl bg-gray-100 dark:bg-[#0B0A10] overflow-hidden border border-gray-300 dark:border-[#1B1728]">

            <FiPlus className="text-4xl" />
            <span className="text-sm mt-2">Upload Image</span>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />

            {file && (
              <div className="absolute inset-0">
                <img
                  src={URL.createObjectURL(file)}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => setFile(null)}
                    className="bg-black/60 text-white px-2 py-1 rounded-md text-xs"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </label>

          <div className="w-full lg:w-1/2 h-full flex flex-col justify-between">

            <div>
              <label className="text-md">
                Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Your Post Title..."
                className="w-full mt-2 p-3 bg-white text-black border border-gray-300 dark:bg-black dark:text-white dark:border-[#1B1728] rounded-lg outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="text-md">
                Description
              </label>

              <textarea
                rows="4"
                maxLength={150}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write something..."
                className="resize-none w-full mt-2 p-3 bg-white text-black border border-gray-300 dark:bg-black dark:text-white dark:border-[#1B1728] rounded-lg outline-none focus:border-violet-500"
              />
            </div>

            <button
              onClick={publishPost}
              className="w-full py-3 rounded-xl bg-violet-800 mt-2 text-white font-medium cursor-pointer hover:bg-violet-700"
            >
              Publish Post
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Create;