import { useEffect, useState } from "react";
import axios from "axios";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/users/history",
          { withCredentials: true }
        );

        setHistory(res.data.data);
      } catch (error) {
        console.log("ERROR:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

     if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0A10]">
        <div className="flex">
          <span className="w-10 h-10 rounded-full border-4 border-slate-600 border-t-violet-500 animate-spin" />
        </div>
      </div>
    );
  }

  function handlePostClick(postId) {
      navigate(`/post/${postId}`);
    }

  return (
    <div className="min-h-screen ml-64 mt-20 px-6 py-6 bg-[#0B0A10] text-white">

      <h2 className="text-2xl font-semibold mb-6">
        Watch History
      </h2>

      {history.length === 0 ? (
        <p className="text-slate-400">No watch history found</p>
      ) : (
        <div className="columns-2 sm:columns-2 lg:columns-3 xl:columns-5 gap-6 space-y-6">

          {history.map((post) => (
            <div
              key={post._id}
              className="mb-6 break-inside-avoid rounded-xl overflow-hidden hover:scale-[1.02] transition"
              onClick={() => handlePostClick(post._id)}
            >
              <img
                src={post.postFile}
                alt={post.title}
                className="w-full object-cover rounded-xl"
              />

              <div className="p-3 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{post.title}</p>
                  <p className="text-xs text-slate-400">
                    @{post.owner.userName}
                  </p>
                </div>

                <HiDotsHorizontal className="cursor-pointer text-slate-400 hover:text-white" />
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default History;
