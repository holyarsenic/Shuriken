import { asyncHandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.models.js";
import {uploadOnCloudnary} from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessandRefreshToken = async(UserId) => {
  try {
    const user = await User.findById(UserId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken() 

      user.refreshToken = refreshToken
      await user.save({validateBeforeSave: false})

    return {accessToken, refreshToken}

  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating access and refresh token")
  }
}

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

const loginUser = asyncHandler( async (req, res) => {
  const {email, userName, password} = req.body

  //validation
  if (!(email || userName)) {
    throw new ApiError(400, "Username or Email is Required")
  }

  //finding user
  const user = await User.findOne({
    $or:[{userName}, {email}]
  })

  if (!user) {
    throw new ApiError(404, "User doesn't exist")
  }

  const isPasswordValid = await user.isPasswordCorrect(password)

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Password")
  }

  const {accessToken, refreshToken} = await generateAccessandRefreshToken(user._id)

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  //sending cookies
  const options = {
    httpOnly: true,
    secure: true //not modifyable by frontend only by server
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(
      200,
      {
        user: loggedInUser, accessToken, refreshToken
      },
      "User Logged in Successfully"
    )
  )


});

const logOut = asyncHandler( async (req, res) => {
  await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

export { registerUser,
  loginUser,
  logOut
 };