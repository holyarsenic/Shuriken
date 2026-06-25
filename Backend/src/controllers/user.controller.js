import { asyncHandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.models.js";
import {uploadOnCloudnary} from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
  
  const {email,userName,fullName, password} = req.body //form data not URL

  //validatioon
  if (
    [email,userName,fullName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError( 400, "All fields are required")
  }

  //finding user if its already exist in database

     const existedUser = await User.findOne({
        $or: [{ userName },{ email }]
      })
  
      if (existedUser) {
        throw new ApiError(409, "User with this Email or Username already existed");
      }

  //Taking Avatar 

      const avatarLocalPath = req.files?.avatar[0]?.path;

      if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is Required")
      }

      const avatar = await uploadOnCloudnary(avatarLocalPath)

      if (!avatar) {
        throw new ApiError(400, "Avatar is Required")
      }

  //throwing data in db now

      const user = await User.create({
        userName: userName.toLowerCase(),
        fullName,
        avtar: avatar.url,
        email,
        password
      })

      //removing password and refreshToken
      const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
      )

      if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
      }

      return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
      )

});

export { registerUser };