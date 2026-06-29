import mongoose, { isValidObjectId } from "mongoose"
import { User } from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asynchandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {

    const { channelId } = req.params

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel id")
    }

    // prevent self subscribe
    if (channelId === req.user?._id.toString()) {
        throw new ApiError(400, "You cannot subscribe to yourself")
    }

    // check channel exists
    const channel = await User.findById(channelId)

    if (!channel) {
        throw new ApiError(404, "Channel not found")
    }

    // already subscribed?
    const alreadySubscribed = await Subscription.findOne({
        accFollowers: req.user?._id,
        accountTheyAreFollowing: channelId
    })

    // unsubscribe
    if (alreadySubscribed) {

        await Subscription.findByIdAndDelete(
            alreadySubscribed._id
        )

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Channel unsubscribed successfully"
            )
        )
    }

    // subscribe
    const subscription = await Subscription.create({
        accFollowers: req.user?._id,
        accountTheyAreFollowing: channelId
    })

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            subscription,
            "Channel subscribed successfully"
        )
    )

})

const getUserChannelSubscribers = asyncHandler(async (req, res) => {

    const { channelId } = req.params

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel id")
    }

    const subscribers = await Subscription.aggregate([

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

                    // subscribers count
                    {
                        $lookup: {
                            from: "subscriptions",
                            localField: "_id",
                            foreignField: "accountTheyAreFollowing",
                            as: "followers"
                        }
                    },

                    // subscribed channels count
                    {
                        $lookup: {
                            from: "subscriptions",
                            localField: "_id",
                            foreignField: "accFollowers",
                            as: "following"
                        }
                    },

                    {
                        $addFields: {

                            subscribersCount: {
                                $size: "$followers"
                            },

                            channelsSubscribedToCount: {
                                $size: "$following"
                            },

                            isSubscribed: {
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
                            subscribersCount: 1,
                            channelsSubscribedToCount: 1,
                            isSubscribed: 1
                        }
                    }
                ]
            }
        },

        {
            $addFields: {
                subscriber: {
                    $first: "$subscriber"
                }
            }
        }
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            subscribers,
            "Subscribers fetched successfully"
        )
    )

})

const getSubscribedChannels = asyncHandler(async (req, res) => {

    const { subscriberId } = req.params

    if (!isValidObjectId(subscriberId)) {
        throw new ApiError(400, "Invalid subscriber id")
    }

    const subscribedChannels = await Subscription.aggregate([

        {
            $match: {
                accFollowers: new mongoose.Types.ObjectId(subscriberId)
            }
        },

        {
            $lookup: {
                from: "users",
                localField: "accountTheyAreFollowing",
                foreignField: "_id",
                as: "accountTheyAreFollowing",

                pipeline: [

                    // subscribers count
                    {
                        $lookup: {
                            from: "subscriptions",
                            localField: "_id",
                            foreignField: "accountTheyAreFollowing",
                            as: "followers"
                        }
                    },

                    // subscribed count
                    {
                        $lookup: {
                            from: "subscriptions",
                            localField: "_id",
                            foreignField: "accFollowers",
                            as: "following"
                        }
                    },

                    {
                        $addFields: {

                            subscribersCount: {
                                $size: "$followers"
                            },

                            channelsSubscribedToCount: {
                                $size: "$following"
                            },

                            isSubscribed: {
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
                            coverImage: 1,
                            subscribersCount: 1,
                            channelsSubscribedToCount: 1,
                            isSubscribed: 1
                        }
                    }
                ]
            }
        },

        {
            $addFields: {
                channel: {
                    $first: "$channel"
                }
            }
        }
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            subscribedChannels,
            "Subscribed channels fetched successfully"
        )
    )

})



export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}