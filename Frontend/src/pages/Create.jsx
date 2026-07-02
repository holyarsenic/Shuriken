import { useState } from "react";
import { FiPlus } from "react-icons/fi";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  return (
    <div className="h-auto w-auto ml-64 pt-24 bg-[#000000] text-white flex justify-center px-6">

      <div className="w-3/4 bg-[#111] rounded-2xl p-8">

        <h1 className="text-2xl font-bold mb-6">Create Post</h1>

        <div className="flex gap-6 h-80">

          <label className="flex flex-col items-center justify-center cursor-pointer w-1/2 h-full rounded-xl bg-gray-800    hover:bg-white hover:text-black transition">
            <FiPlus className="text-4xl" />
            <span className="text-sm mt-2">Upload Image</span>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <div className="w-1/2 h-full flex flex-col justify-between">

            <div>
              <label className="text-sm text-slate-400">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title..."
                className="w-full mt-2 p-3 bg-black border border-slate-700 rounded-lg outline-none focus:border-slate-500"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">Description</label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write something..."
                className="w-full mt-2 p-3 bg-black border border-slate-700 rounded-lg outline-none focus:border-slate-500"
              />
            </div>
            <button className="w-full py-3 rounded-xl from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 transition font-medium">
              Publish Post
            </button>

          </div>

        </div>

        {file && (
          <div className="mt-6">
            <img
              src={URL.createObjectURL(file)}
              className="w-full h-64 object-cover rounded-xl border border-slate-700"
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default Create;