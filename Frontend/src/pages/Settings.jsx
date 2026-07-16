import { IoIosArrowForward } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { User } from "../context/user";
import { useState } from "react";

const Settings = () => {

  const { logOut, changePassword } = User();


  const [passwordSetting, setPasswordSetting] = useState(false);
  const [ oldPassword, setOldPassword ] = useState("")
  const [ newPassword, setNewPassword ] = useState("")
  const [ confirmPassword, setConfirmPassword ] = useState("")
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    try {
      const res = await changePassword(
        oldPassword,
        newPassword,
        confirmPassword
      );

      setMessage(res.message)
      setMessageType("success")

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

       setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);

    } catch (error) {
        setMessage(error.response?.data?.message || "Something went wrong")
        setMessageType("error")

        setTimeout(() => {
          setMessage("");
          setMessageType("");
        }, 3000);
    }
  };

  return (
    <div className="min-h-screen w-auto ml-64 mt-20 bg-[#0B0A10] text-white px-8 py-8 flex">
      <div className="min-w-2xl border-r border-[#3B0764] pr-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400 mb-8">
          Manage your account settings and preferences.
        </p>

        <div className="bg-[#14131C] rounded-xl border border-gray-800 mb-6">
          <h2 className="px-6 py-4 text-lg font-semibold border-b border-gray-800">
            Account
          </h2>

          <Link to="/dashboard" className="w-full flex justify-between items-center px-6 py-4 hover:bg-[#1D1C27] transition border-b border-gray-800">
            <span>Edit Profile</span>
            <IoIosArrowForward className="text-gray-500 text-2xl"/>
          </Link>
        </div>

        <div className="bg-[#14131C] rounded-xl border border-gray-800 mb-6">
          <h2 className="px-6 py-4 text-lg font-semibold border-b border-gray-800">
            Security
          </h2>

          <button className="w-full flex justify-between items-center px-6 py-4 hover:bg-[#1D1C27] transition border-b border-gray-800"
          onClick={() => setPasswordSetting(true)}>
            <span>Change Password</span>
            <IoIosArrowForward className="text-gray-500 text-2xl"/>
          </button>
        </div>

        <div className="bg-[#14131C] rounded-xl border border-gray-800 mb-6">
          <h2 className="px-6 py-4 text-lg font-semibold border-b border-gray-800">
            Preferences
          </h2>

          <button className="w-full flex justify-between items-center px-6 py-4 hover:bg-[#1D1C27] transition">
            <span>Theme</span>
            <IoIosArrowForward className="text-gray-500 text-2xl"/>
          </button>
        </div>

        <div className="bg-[#14131C] rounded-xl border border-gray-800 mb-6">
          <h2 className="px-6 py-4 text-lg font-semibold border-b border-gray-800">
            Contact
          </h2>

          <button className="w-full flex justify-between items-center px-6 py-4 hover:bg-[#1D1C27] transition border-b border-gray-800">
            <FaLinkedin className="text-white text-lg"/>
            <IoIosArrowForward className="text-gray-500 text-2xl"/>
          </button>

          <button className="w-full flex justify-between items-center px-6 py-4 hover:bg-[#1D1C27] transition border-b border-gray-800">
            <FaXTwitter className="text-white text-lg"/>
            <IoIosArrowForward className="text-gray-500 text-2xl"/>
          </button>

          <button className="w-full flex justify-between items-center px-6 py-4 hover:bg-[#1D1C27] transition border-b border-gray-800">
            <FaGithub className="text-white text-lg"/>
            <IoIosArrowForward className="text-gray-500 text-2xl"/>
          </button>

        </div>

        <div className="bg-[#14131C] rounded-xl border border-gray-800 mb-6">
            <button className="w-full py-3 rounded-lg bg-red-700 hover:bg-red-600 transition"
            onClick={logOut}
            >
              Logout
            </button>
        </div>
      </div>
      
      {passwordSetting && (
        <div className="flex-1 mt-20">
          <div className="max-w-lg mx-auto bg-[#14131C] border border-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-2">Change Password</h2>
            <p className="text-violet-400 mb-6">
              Update your password to keep your account secure.
            </p>

            <form className="flex flex-col gap-5" onSubmit={handleChangePassword}>
              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  Old Password
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter your current password"
                  className="w-full bg-[#0B0A10] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-600 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  New Password
                </label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="w-full bg-[#0B0A10] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-600 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  Confirm New Password
                </label>
                <input
                  type="text"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  className="w-full bg-[#0B0A10] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-600 placeholder:text-gray-400"
                />
              </div>

              {message && (
                <div
                  className={`ml-4  ${
                    messageType === "success"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setPasswordSetting(false)}
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg transition"
                >
                  <FaArrowLeft className="text-xl "/>
                </button>

                <button
                  type="submit"
                  className="bg-purple-700 hover:bg-purple-600 px-6 py-3 rounded-lg font-medium transition"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Settings;