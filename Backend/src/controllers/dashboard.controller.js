import mongoose from "mongoose"
import {Post} from "../models/post.models.js"
import {Follow} from "../models/followList.models.js"
import {Like} from "../models/like.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asynchandler.js"

const getChannelStats = asyncHandler(async (req, res) => {

    const channelId = req.user?._id;

    // total posts
    const totalPosts = await Post.countDocuments({
        owner: channelId
    });

    // total views
    const totalViewsResult = await Post.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(channelId)
            }
        },
        {
            $group: {
                _id: null,
                totalViews: { $sum: "$views" }
            }
        }
    ]);

    const totalViews = totalViewsResult[0]?.totalViews || 0;

    //followers (people who follow me)
    const totalFollowers = await Follow.countDocuments({
        accountTheyAreFollowing: channelId
    });

    //following (people I follow)
    const totalFollowing = await Follow.countDocuments({
        accFollowers: channelId
    });

    // total likes on posts
    const totalLikesResult = await Post.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(channelId)
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "post",
                as: "likes"
            }
        },
        {
            $addFields: {
                likesCount: { $size: "$likes" }
            }
        },
        {
            $group: {
                _id: null,
                totalLikes: { $sum: "$likesCount" }
            }
        }
    ]);

    const totalLikes = totalLikesResult[0]?.totalLikes || 0;

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalPosts,
                totalViews,
                totalFollowers,
                totalFollowing,
                totalLikes
            },
            "Channel stats fetched successfully"
        )
    );
});

const getChannelPosts = asyncHandler(async (req, res) => {
    // TODO: Get all the posts uploaded by the channel
     const channelPosts = await Post.aggregate([

        {
            $match: {
                owner: new mongoose.Types.ObjectId(
                    req.user?._id
                )
            }
        },

        // likes
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "post",
                as: "likes"
            }
        },

        {
            $addFields: {

                likesCount: {
                    $size: "$likes"
                }

            }
        },

        // owner
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",

                pipeline: [

                    {
                        $lookup: {
                            from: "follows",
                            localField: "_id",
                            foreignField: "channel",
                            as: "followers"
                        }
                    },

                    {
                        $addFields: {

                            followersCount: {
                                $size: "$followers"
                            },

                            isFollowed: {
                                $cond: {
                                    if: {
                                        $in: [
                                            req.user?._id,
                                            "$followers.accFollowers"
                                        ]
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
                            username: 1,
                            avatar: 1,
                            followersCountersCount: 1,
                            isFollowed: 1
                        }
                    }

                ]
            }
        },

        {
            $addFields: {
                owner: {
                    $first: "$owner"
                }
            }
        },

        {
            $project: {
                postFile: 1,
                title: 1,
                description: 1,
                duration: 1,
                views: 1,
                createdAt: 1,
                isPublished: 1,
                likesCount: 1,
                owner: 1
            }
        },

        {
            $sort: {
                createdAt: -1
            }
        }

    ])

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            channePosts,
            "Channel posts fetched successfully"
        )
    )

})

export {
    getChannelStats, 
    getChannelPosts
    }