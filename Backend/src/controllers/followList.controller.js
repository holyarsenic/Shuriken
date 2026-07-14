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
        accFollower: req.user?._id,
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
        accFollower: req.user?._id,
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
                localField: "accFollower",
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
                            foreignField: "accFollower",
                            as: "following"
                        }
                    },

                    {
                        $addFields: {

                            isFollowed: {
                                $in: [
                                    new mongoose.Types.ObjectId(req.user._id),
                                    {
                                        $map: {
                                            input: "$followers",
                                            as: "follower",
                                            in: "$$follower.accFollower"
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
                            avatar: 1,
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

    if (!isValidObjectId(followedId)) {
        throw new ApiError(400, "Invalid follower id")
    }

    const followedChannels = await Follow.aggregate([ 

        {
            $match: {
                accFollower: new mongoose.Types.ObjectId(followedId)
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
                            foreignField: "accFollower",
                            as: "following"
                        }
                    },

                    {
                        $addFields: {

                             isFollowed: {
                                $in: [
                                    new mongoose.Types.ObjectId(req.user._id),
                                    {
                                        $map: {
                                            input: "$followers",
                                            as: "follower",
                                            in: "$$follower.accFollower"
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
                            avatar: 1,
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