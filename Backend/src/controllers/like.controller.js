import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asynchandler.js"

const togglePostLike = asyncHandler(async (req, res) => {
    const {postId} = req.params
    //TODO: toggle like on post
     if (!isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid post id")
    }

    const post = await Post.findById(postId)

    if (!post) {
        throw new ApiError(404, "Post not found")
    }

    const alreadyLiked = await Like.findOne({
        post: postId,
        likedBy: req.user?._id
    })

    // unlike
    if (alreadyLiked) {

        await Like.findByIdAndDelete(
            alreadyLiked._id
        )

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Post unliked successfully"
            )
        )
    }

    // like
    const like = await Like.create({
        post: postId,
        likedBy: req.user?._id
    })

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            like,
            "Post liked successfully"
        )
    )

})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment id")
    }

    const comment = await Comment.findById(commentId)

    if (!comment) {
        throw new ApiError(404, "Comment not found")
    }

    const alreadyLiked = await Like.findOne({
        comment: commentId,
        likedBy: req.user?._id
    })

    // unlike
    if (alreadyLiked) {

        await Like.findByIdAndDelete(
            alreadyLiked._id
        )

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Comment unliked successfully"
            )
        )
    }

    // like
    const like = await Like.create({
        comment: commentId,
        likedBy: req.user?._id
    })

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            like,
            "Comment liked successfully"
        )
    )

})

const getLikedPosts = asyncHandler(async (req, res) => {
    //TODO: get all liked posts
        const likedPosts = await Like.aggregate([

        {
            $match: {
                likedBy: new mongoose.Types.ObjectId(
                    req.user?._id
                ),
                post: {
                    $exists: true
                }
            }
        },

        {
            $lookup: {
                from: "posts",
                localField: "post",
                foreignField: "_id",
                as: "post",

                pipeline: [

                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",

                            pipeline: [

                                {
                                    $lookup: {
                                        from: "subscriptions",
                                        localField: "_id",
                                        foreignField: "channel",
                                        as: "subscribers"
                                    }
                                },

                                {
                                    $addFields: {
                                        subscribersCount: {
                                            $size: "$subscribers"
                                        },

                                        isSubscribed: {
                                            $cond: {
                                                if: {
                                                    $in: [
                                                        req.user?._id,
                                                        "$subscribers.subscriber"
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
                                        isSubscribed: 1
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
                    }
                ]
            }
        },

        {
            $addFields: {
                post: {
                    $first: "$post"
                }
            }
        }

    ])

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            likedPosts,
            "Liked posts fetched successfully"
        )
    )
})

export {
    toggleCommentLike,
    togglePostLike,
    getLikedPosts
}