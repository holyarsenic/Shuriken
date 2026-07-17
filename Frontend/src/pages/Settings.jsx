import { IoIosArrowForward } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { User } from "../context/user";
import { useState } from "react";
import { Theme } from "../context/theme";

const Settings = () => {

  const { logOut, changePassword } = User();
  const { theme, toggleTheme } = Theme();


  const [passwordSetting, setPasswordSetting] = useState(false);
  const [themeSetting, setThemeSetting] = useState(false);
  const [ oldPassword, setOldPassword ] = useState("")
  const [ newPassword, setNewPassword ] = useState("")
  const [ confirmPassword, setConfirmPassword ] = useState("")
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 

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
  <div className="min-h-screen w-auto ml-64 mt-20 bg-white dark:bg-[#0B0A10] text-black dark:text-white px-8 py-8 flex">
    <div className="min-w-2xl border-r border-gray-300 dark:border-[#3B0764] pr-8">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Manage your account settings and preferences.
      </p>

      <div className="bg-white dark:bg-[#14131C] rounded-xl border border-gray-300 dark:border-gray-800 mb-6">
        <h2 className="px-6 py-4 text-lg font-semibold border-b border-gray-300 dark:border-gray-800">
          Account
        </h2>

        <Link
          to="/dashboard"
          className="w-full flex justify-between items-center px-6 py-4 hover:bg-gray-100 dark:hover:bg-[#1D1C27] transition border-b border-gray-300 dark:border-gray-800"
        >
          <span>Edit Profile</span>
          <IoIosArrowForward className="text-gray-500 text-2xl" />
        </Link>
      </div>

      <div className="bg-white dark:bg-[#14131C] rounded-xl border border-gray-300 dark:border-gray-800 mb-6">
        <h2 className="px-6 py-4 text-lg font-semibold border-b border-gray-300 dark:border-gray-800">
          Security
        </h2>

        <button
          className="w-full flex justify-between items-center px-6 py-4 hover:bg-gray-100 dark:hover:bg-[#1D1C27] transition border-b border-gray-300 dark:border-gray-800"
          onClick={() => {
            setPasswordSetting(true)
            setThemeSetting(false)
          }}
        >
          <span>Change Password</span>
          <IoIosArrowForward className="text-gray-500 text-2xl" />
        </button>
      </div>

      <div className="bg-white dark:bg-[#14131C] rounded-xl border border-gray-300 dark:border-gray-800 mb-6">
        <h2 className="px-6 py-4 text-lg font-semibold border-b border-gray-300 dark:border-gray-800">
          Preferences
        </h2>

        <button className="w-full flex justify-between items-center px-6 py-4 hover:bg-gray-100 dark:hover:bg-[#1D1C27] transition"
          onClick={() => {
            setThemeSetting(true)
            setPasswordSetting(false)
          }}
        >
          <span>Theme</span>
          <IoIosArrowForward className="text-gray-500 text-2xl" />
        </button>
      </div>

      <div className="bg-white dark:bg-[#14131C] rounded-xl border border-gray-300 dark:border-gray-800 mb-6">
        <h2 className="px-6 py-4 text-lg font-semibold border-b border-gray-300 dark:border-gray-800">
          Contact
        </h2>

        <button className="w-full flex justify-between items-center px-6 py-4 hover:bg-gray-100 dark:hover:bg-[#1D1C27] transition border-b border-gray-300 dark:border-gray-800">
          <FaLinkedin className="text-lg" />
          <IoIosArrowForward className="text-gray-500 text-2xl" />
        </button>

        <button className="w-full flex justify-between items-center px-6 py-4 hover:bg-gray-100 dark:hover:bg-[#1D1C27] transition border-b border-gray-300 dark:border-gray-800">
          <FaXTwitter className="text-lg" />
          <IoIosArrowForward className="text-gray-500 text-2xl" />
        </button>

        <button className="w-full flex justify-between items-center px-6 py-4 hover:bg-gray-100 dark:hover:bg-[#1D1C27] transition border-b border-gray-300 dark:border-gray-800">
          <FaGithub className="text-lg" />
          <IoIosArrowForward className="text-gray-500 text-2xl" />
        </button>
      </div>

      <div className="bg-white dark:bg-[#14131C] rounded-xl border border-gray-300 dark:border-gray-800 mb-6">
        <button
          className="w-full py-3 rounded-lg bg-red-700 hover:bg-red-600 transition text-white"
          onClick={logOut}
        >
          Logout
        </button>
      </div>
    </div>

    {passwordSetting && (
      <div className="flex-1 mt-20">
        <div className="max-w-lg mx-auto bg-white dark:bg-[#14131C] border border-gray-300 dark:border-gray-800 rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-2">Change Password</h2>
          <p className="text-violet-500 mb-6">
            Update your password to keep your account secure.
          </p>

          <form className="flex flex-col gap-5" onSubmit={handleChangePassword}>
            <div>
              <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">
                Old Password
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter your current password"
                className="w-full bg-gray-100 dark:bg-[#0B0A10] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-600 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                className="w-full bg-gray-100 dark:bg-[#0B0A10] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-600 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                className="w-full bg-gray-100 dark:bg-[#0B0A10] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-600 placeholder:text-gray-400"
              />
            </div>

            {message && (
              <div
                className={`ml-4 ${
                  messageType === "success"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {message}
              </div>
            )}

            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={() => setPasswordSetting(false)}
                className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg transition text-white"
              >
                <FaArrowLeft className="text-xl" />
              </button>

              <button
                type="submit"
                className="bg-purple-700 hover:bg-purple-600 px-6 py-3 rounded-lg font-medium transition text-white"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    {themeSetting && (
      <div className="flex-1 mt-20">
        <div className="max-w-lg mx-auto bg-white dark:bg-[#14131C] border border-gray-300 dark:border-gray-800 rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-2">Change Theme</h2>
          <p className="text-violet-500 mt-3">
            Switch to {theme === "dark"? "Light" : "Dark"} Mode.
          </p>
          <button
          onClick={toggleTheme}
          className="w-full flex justify-between items-center px-6 py-4 hover:bg-gray-100 dark:hover:bg-[#1D1C27] transition border-b border-gray-300 dark:border-gray-800 mt-10"
          >
            {theme === "dark"? "Light" : "Dark"}
          </button>
        </div>
      </div>
    )}
  </div>
);
};

export default Settings;