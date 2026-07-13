import { asyncHandler } from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.models.js";
import {Post} from "../models/post.models.js";
import {uploadOnCloudnary} from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

const generateAccessAndRefreshToken = async(UserId) => {
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

  //throwing data in db now

      const user = await User.create({
        userName: userName.toLowerCase(),
        fullName,
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

  const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

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
});


const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body

    

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})


const getCurrentUser = asyncHandler(async(req, res) => {
    
    const user = req.user;

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        user,
        "User fetched successfully"
    ))
})

const updateAccountDetails = asyncHandler(async(req, res) => {
    const {fullName, email ,bio} = req.body

    if (!(fullName || email || bio)) {
        throw new ApiError(400, "At least one field is required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email,
                bio
            }
        },
        {new: true}
        
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
});

const updateUserAvatar = asyncHandler(async(req, res) => {
    const avatarLocalPath = req.file?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }

    //taking oldavatar
      const userOld = await User.findById(req.user?._id);
      const oldAvatarUrl = userOld?.avatar; 

    const avatar = await uploadOnCloudnary(avatarLocalPath)

    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading on avatar")
        
    }

      if (oldAvatarUrl) {
        const parts = oldAvatarUrl.split("/");
        const fileName = parts.pop();
        const publicId = fileName.split(".")[0];

        await cloudinary.uploader.destroy(publicId);
        }


    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avatar: avatar.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Avatar image updated successfully")
    )
})

const getMyProfile = asyncHandler(async(req,res) =>{

    const profile = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "follows",
                localField: "_id",
                foreignField:"accountTheyAreFollowing",
                as:"followers"
            }
        },
        {
            $lookup: {
                from:"follows",
                localField:"_id",
                foreignField:"accFollower",
                as:"following"
            }
        },
        {
            $lookup:{
                from: "posts",
                localField:"_id",
                foreignField:"owner",
                as:"myPosts"
            }
        },
        {
            $addFields: {
                followersCount: {
                    $size: "$followers"
                },
                followingCount: {
                    $size: "$following"
                },
                totalPosts: {
                    $size: "$myPosts"
                }
            }
        },
        {
            $project:{
                userName:1,
                fullName:1,
                avatar:1,
                bio:1,
                followersCount:1,
                followingCount:1,
                totalPosts:1,
                myPosts:1
            }
        }
    ])

     return res
     .status(200)
     .json(
        new ApiResponse(200,
             profile[0]
        , "User channel fetched successfully")
     )
})


const getUserChannelProfile = asyncHandler(async(req, res) => {
    const {username} = req.params

    if (!username?.trim()) {
        throw new ApiError(400, "username is missing")
    }

    const channel = await User.aggregate([
        {
            $match: {
                userName: username?.toLowerCase()
            }
        },
        {
            $lookup: {
                from: "follows",
                localField: "_id",
                foreignField: "accountTheyAreFollowing",
                as: "followers"
            }
        },
        {
            $lookup: {
                from: "follows",
                localField: "_id",
                foreignField: "accFollower",
                as: "followings"
            }
        },
        {
            $lookup: {
                from: "posts",
                localField: "_id",
                foreignField: "owner",
                as: "userPosts"
            }
        },
        {
            $addFields: {
                followersCount: {
                    $size: "$followers"
                },
                followingCount: {
                    $size: "$followings"
                },
                totalPosts: {
                    $size: "$userPosts"
                },
                isFollowed: {
                    $in: [
                        req.user?._id,
                        {
                        $map: {
                            input: "$followers",
                            as: "f",
                            in: "$$f.accFollower"
                        }
                        }
                    ]
                    }
            }
        },
        {
            $project: {
                fullName: 1,
                userName: 1,
                avatar:1,
                bio:1,
                userPosts:1,
                followersCount: 1,
                followingCount: 1,
                totalPosts:1,
                isFollowed: 1,
                email: 1

            }
        }
    ])

    if (!channel?.length) {
        throw new ApiError(404, "channel does not exists")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, channel[0], "User channel fetched successfully")
    )
})

const getWatchHistory = asyncHandler(async(req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "posts",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
                                        userName: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields:{
                            owner:{
                                $first: "$owner"
                            }
                        }
                    }
                ]
            }
        }
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user[0].watchHistory,
            "Watch history fetched successfully"
        )
    )
})


export {
    registerUser,
    loginUser,
    logOut,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    getMyProfile,
    getUserChannelProfile,
    getWatchHistory
}