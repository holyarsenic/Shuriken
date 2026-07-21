import { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaArrowLeftLong } from "react-icons/fa6";
import api from "../api/axios";
import { ProfileData } from "../context/userProfile";

const EditProfile = ({ closeProfileEdit }) => {
  const { fetchProfile, profile } = ProfileData();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!profile) {
      fetchProfile();
    }
  }, [profile, fetchProfile]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0A10]">
        <span className="w-10 h-10 rounded-full border-2 lg:border-4 border-slate-600 border-t-violet-500 animate-spin" />
      </div>
    );
  }

  const updateProfile = async () => {

    setLoading(true)
    try {
      const formData = new FormData();

      formData.append("fullName", fullName || profile.fullName);
      formData.append("email", email || profile.email);
      formData.append("bio", bio || profile.bio);

      if (file) {
        formData.append("avatar", file);
      }

      await api.patch(
        "/users/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );

      closeProfileEdit();
      fetchProfile(false);
    } catch (error) {
      alert(
        "Update failed:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false)
    }
  };

  const handleFile = (e) => {
    const image = e.target.files[0];

    if (image) {
      setFile(image);
      setPreview(URL.createObjectURL(image));
    }
  };

  return (
    <div className="fixed inset-0 ml-0 lg:mb-0 lg:ml-64 bg-black/2 dark:bg-[#0B0A10]/10 backdrop-blur-sm text-black dark:text-white flex items-center justify-center z-5">

      <div className="relative h-140 w-85 lg:w-180 lg:h-125 bg-white dark:bg-[#151320] border border-gray-300 dark:border-[#3B0764] rounded-2xl p-4 pb-8 lg:p-8 shadow-lg overflow-scroll lg:overflow-hidden">

        <h1 className="text-2xl font-bold mb-3 lg:mb-6">
          Edit Profile
        </h1>

        <button
          type="button"
          onClick={closeProfileEdit}
          className="absolute top-4 right-5 px-2 py-1 rounded-full z-20"
        >
          <FaArrowLeftLong className="text-2xl text-black dark:text-white" />
        </button>

        <div className="relative flex flex-col lg:flex-row gap-3 lg:gap-6 h-auto">

          <label className="relative flex flex-col items-center justify-center cursor-pointer w-full lg:w-1/2 h-75 lg:h-80 rounded-full bg-gray-200 dark:bg-black overflow-hidden">

            {!preview && (
              <div className="absolute inset-0">
                <img
                  src={profile?.avatar}
                  className="w-full h-full object-cover"
                  alt="avatar"
                />
                <span className="absolute inset-0 flex items-center justify-center text-white bg-black/30">
                  Tap to Change Avatar
                </span>
              </div>
            )}

            {preview && (
              <div className="absolute inset-0">
                <img
                  src={preview}
                  className="w-full h-full object-cover"
                  alt="avatar"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
          </label>

          <button
            type="button"
            onClick={() => {
              setFile(null);
              setPreview(null);
            }}
            className="absolute top-4 left-63 z-20"
          >
            <RxCross1 className="text-3xl text-black dark:text-white" />
          </button>

          <div className="w-full lg:w-1/2 flex flex-col justify-between">

            <div>
              <label>Full Name</label>

              <input
                type="text"
                defaultValue={profile?.fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your name"
                className="w-full mt-2 p-3 bg-gray-100 dark:bg-black rounded-lg border border-gray-300 dark:border-[#2A2438] outline-none"
              />
            </div>

            <div>
              <label>Email</label>

              <input
                type="email"
                defaultValue={profile?.email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full mt-2 p-3 bg-gray-100 dark:bg-black rounded-lg border border-gray-300 dark:border-[#2A2438] outline-none"
              />
            </div>

            <div>
              <label>Bio</label>

              <textarea
                rows="4"
                defaultValue={profile.bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={50}
                placeholder="Enter your Bio."
                className="resize-none w-full mt-2 p-3 bg-gray-100 dark:bg-black rounded-lg border border-gray-300 dark:border-[#2A2438] outline-none"
              />
            </div>

            <button
              onClick={updateProfile}
              disabled={loading}
              className="w-full my-2 py-3 rounded-xl bg-violet-800 text-white cursor-pointer flex items-center justify-center"
            >
              {loading ? (
                <span className="w-5 h-5 lg:w-7 lg:h-7 rounded-full border border-white border-t-transparent animate-spin"></span>
              ) : (
                "Save Changes"
              )}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default EditProfile;