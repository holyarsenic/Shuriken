import mongoose, { isValidObjectId } from "mongoose"
import { User } from "../models/user.models.js"
import { Follow } from "../models/followList.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asynchandler.js"


const toggleFollow = asyncHandler(async (req, res) => {

    const { channelId } = req.params

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel id")
    }

    // prevent self follow
    if (channelId === req.user?._id.toString()) {
        throw new ApiError(400, "You cannot follow yourself")
    }

    // check channel exists
    const channel = await User.findById(channelId)

    if (!channel) {
        throw new ApiError(404, "Channel not found")
    }

    // already followed?
    const alreadyFollowed = await Follow.findOne({
        accFollowers: req.user?._id,
        accountTheyAreFollowing: channelId
    })

    // unfollow
    if (alreadyFollowed) {

        await Follow.findByIdAndDelete(
            alreadyFollowed._id
        )

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Channel unfollowed successfully"
            )
        )
    }

    // follow
    const follow = await Follow.create({
        accFollowers: req.user?._id,
        accountTheyAreFollowing: channelId
    })

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            follow,
            "Channel followed successfully"
        )
    )
})

const getUserChannelFollowers = asyncHandler(async (req, res) => {

    const { channelId } = req.params

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel id")
    }

    const followers = await Follow.aggregate([   

        {
            $match: {
                accountTheyAreFollowing: new mongoose.Types.ObjectId(channelId)
            }
        },

        {
            $lookup: {
                from: "users",
                localField: "accFollowers",
                foreignField: "_id",
                as: "follower",
                pipeline: [

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
                            foreignField: "accFollowers",
                            as: "following"
                        }
                    },

                    {
                        $addFields: {
                            followersCount: { $size: "$followers" },
                            followingCount: { $size: "$following" },

                            isFollowed: {
                                $cond: {
                                    if: {
                                        $in: [req.user?._id, "$followers.accFollowers"]
                                    },
                                    then: true,
                                    else: false
                                }
                            }
                        }
                    },

                    {
                        $project: {
                            fullName: 1,
                            userName: 1,
                            avatar: 1,
                            followersCount: 1,
                            followingCount: 1,
                            isFollowed: 1
                        }
                    }
                ]
            }
        },

        {
            $addFields: {
                follower: { $first: "$follower" }
            }
        }
    ])

    return res.status(200).json(
        new ApiResponse(200, followers, "Followers fetched successfully")
    )
})

const getFollowedChannels = asyncHandler(async (req, res) => {

    const { followedId } = req.params

    if (!isValidObjectId(followedIdId)) {
        throw new ApiError(400, "Invalid follower id")
    }

    const followedChannels = await Follow.aggregate([ 

        {
            $match: {
                accFollowers: new mongoose.Types.ObjectId(followedId)
            }
        },

        {
            $lookup: {
                from: "users",
                localField: "accountTheyAreFollowing",
                foreignField: "_id",
                as: "channel",
                pipeline: [

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
                            foreignField: "accFollowers",
                            as: "following"
                        }
                    },

                    {
                        $addFields: {
                            followersCount: { $size: "$followers" },
                            followingCount: { $size: "$following" },

                            isFollowed: {
                                $cond: {
                                    if: {
                                        $in: [req.user?._id, "$followers.accFollowers"]
                                    },
                                    then: true,
                                    else: false
                                }
                            }
                        }
                    },

                    {
                        $project: {
                            fullName: 1,
                            userName: 1,
                            avatar: 1,
                            coverImage: 1,
                            followersCount: 1,
                            followingCount: 1,
                            isFollowed: 1
                        }
                    }
                ]
            }
        },

        {
            $addFields: {
                channel: { $first: "$channel" }
            }
        }
    ])

    return res.status(200).json(
        new ApiResponse(200, followedChannels, "Following fetched successfully")
    )
})


export {
    toggleFollow,
    getUserChannelFollowers,
    getFollowedChannels
}