import { useState} from "react";
import { RxCross1 } from "react-icons/rx";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import { useEffect } from "react";
import { ProfileData } from "../context/userProfile";


const EditProfile = ({ closeProfileEdit }) => {

  const {fetchProfile, profile} = ProfileData();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
      if (!profile) {
    fetchProfile();
  }
  },[profile,fetchProfile])

  if (!profile) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0A10]">
      <span className="w-10 h-10 rounded-full border-4 border-slate-600 border-t-violet-500 animate-spin" />
    </div>
  );
}

  const updateProfile = async () => {
    try {

      const formData = new FormData();

      formData.append("fullName", fullName || profile.fullName);
      formData.append("email", email || profile.email);
      formData.append("bio", bio || profile.bio);

      if(file){
        formData.append("avatar", file);
      }


       await axios.patch(
        "http://localhost:8000/api/v1/users/update-profile",
        formData,
        {
          headers:{
            "Content-Type":"multipart/form-data"
          },
          withCredentials:true
        }
      );


      alert("Profile updated successfully!");

      closeProfileEdit();


    } catch(error){

      console.log(
        "Update failed:",
        error.response?.data || error.message
      );

    }

  };

  const handleFile = (e) => {

    const image = e.target.files[0];

    if(image){

      setFile(image);
      setPreview(URL.createObjectURL(image));

    }

  };



  return (

    <div
    className="fixed inset-0 ml-64 bg-[#0B0A10]/10 backdrop-blur-sm text-white flex items-center justify-center">


      <div className="relative w-1/2 h-125 bg-[#151320] rounded-2xl p-8 border border-[#3B0764] shadow-lg overflow-hidden">


        <h1 className="text-2xl font-bold mb-6">
          Edit Profile
        </h1>

        <button
          type="button"
          onClick={closeProfileEdit}
          className="absolute top-4 right-5 bg-gray/5 px-2 py-1 rounded-full z-20"
          >
          <FaArrowLeftLong className="text-2xl"/>
        </button>


        <div className=" relative flex gap-6 h-80">

          <label className="relative flex flex-col items-center justify-center cursor-pointer w-1/2 h-full rounded-full bg-black overflow-hidden">


            {!preview && (
              <div className="absolute inset-0">

                <img
                  src={profile?.avatar}
                  className="relative w-full h-full object-cover"
                  alt="avatar"
                />
                <span className="absolute inset-0 flex items-center justify-center text-white bg-black/30">Tap to Change Avatar</span>
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
                  onClick={()=>{
                    setFile(null);
                    setPreview(null);
                  }}
                  className="absolute top-4 left-63 z-20"
                >
                  <RxCross1 className="text-3xl"/>
            </button>
          
          <div className="w-1/2 flex flex-col justify-between">


            <div>

              <label>
                Full Name
              </label>

              <input
                type="text"
                defaultValue={profile?.fullName}
                onChange={(e)=>setFullName(e.target.value)}
                placeholder="Enter your name"
                className="w-full mt-2 p-3 bg-black rounded-lg"
              />

            </div>



            <div>

              <label>
                Email
              </label>

              <input
                type="email"
                defaultValue={profile?.email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full mt-2 p-3 bg-black rounded-lg"
              />

            </div>

            <div>

              <label>
                Bio
              </label>

              <textarea
                rows="4"
                defaultValue={profile.bio}
                onChange={(e)=>setBio(e.target.value)}
                placeholder="Enter your Bio."
                className="resize-none w-full mt-2 p-3 bg-black rounded-lg"
              />

            </div>



            <button
              onClick={updateProfile}
              className="w-full my-2 py-3 rounded-xl bg-violet-800 text-white cursor-pointer"
            >
              Save Changes
            </button>


          </div>


        </div>


      </div>


    </div>

  );
};


export default EditProfile;