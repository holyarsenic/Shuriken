import { useEffect, useState } from "react";
import axios from "axios";
import { GoArrowUpRight } from "react-icons/go";
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
       <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0B0A10]">
        <div className="flex">
          <span className="w-10 h-10 rounded-full border-4 border-slate-300 dark:border-slate-600 border-t-violet-500 dark:border-t-violet-500 animate-spin" />
        </div>
      </div>
    );
  }

  function handlePostClick(postId) {
    navigate(`/post/${postId}`);
  }

  return (
   <div className="min-h-screen mt-5 lg:mt-24 ml-0 lg:ml-64 pb-20 lg:pb-6 px-4 sm:px-6 lg:px-8 bg-gray-50 text-black dark:bg-[#0B0A10] dark:text-white">
      <h2 className="mb-6 text-xl sm:text-2xl font-semibold">
        Watch History
      </h2>

      {history.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">
          No watch history found
        </p>
      ) : (
        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3 lg:gap-6 space-y-6">
          {history.map((post) => (
            <div
              key={post._id}
              onClick={() => handlePostClick(post._id)}
              className="mb-6 break-inside-avoid overflow-hidden rounded-xl cursor-pointer transition-transform hover:scale-[1.02]"
            >
              <img
                src={post.postFile}
                alt={post.title}
                className="w-full rounded-xl object-cover"
              />

              <div className="flex items-center justify-between p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {post.title}
                  </p>

                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    @{post.owner.userName}
                  </p>
                </div>

                <GoArrowUpRight className="ml-2 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;