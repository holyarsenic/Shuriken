import mongoose from "mongoose"
import {Comment} from "../models/comment.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asynchandler.js"

const getPostComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {postId} = req.params
    const {page = 1, limit = 10} = req.query

    if (!isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid post id")
    }

    const post = await Post.findById(postId)

    if (!post) {
        throw new ApiError(404, "Post not found")
    }

    const aggregate = Comment.aggregate([

        {
            $match: {
                post: new mongoose.Types.ObjectId(postId)
            }
        },

        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",

                pipeline: [

                    // subscriber count
                    {
                        $lookup: {
                            from: "subscriptions",
                            localField: "_id",
                            foreignField: "channel",
                            as: "subscribers"
                        }
                    },

                    // subscribed count
                    {
                        $lookup: {
                            from: "subscriptions",
                            localField: "_id",
                            foreignField: "subscriber",
                            as: "subscribedTo"
                        }
                    },

                    {
                        $addFields: {

                            subscribersCount: {
                                $size: "$subscribers"
                            },

                            channelsSubscribedToCount: {
                                $size: "$subscribedTo"
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
                            channelsSubscribedToCount: 1,
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
        },

        {
            $sort: {
                createdAt: -1
            }
        }

    ])

    const options = {
        page: Number(page),
        limit: Number(limit)
    }

    const comments = await Comment.aggregatePaginate(
        aggregate,
        options
    )

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            comments,
            "Comments fetched successfully"
        )
    )


})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    
    const { postId } = req.params

    const { content } = req.body

    if (!isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid post id")
    }

    if (!content || content.trim() === "") {
        throw new ApiError(400, "Comment content is required")
    }

    const post = await Post.findById(postId)

    if (!post) {
        throw new ApiError(404, "Post not found")
    }

    const comment = await Comment.create({
        content,
        post: postId,
        owner: req.user?._id
    })

    const createdComment = await Comment.aggregate([

        {
            $match: {
                _id: comment._id
            }
        },

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
                            username: 1,
                            avatar: 1
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

    ])

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            createdComment[0],
            "Comment added successfully"
        )
    )
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
        const { commentId } = req.params

    const { content } = req.body

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment id")
    }

    if (!content || content.trim() === "") {
        throw new ApiError(400, "Content is required")
    }

    const comment = await Comment.findById(commentId)

    if (!comment) {
        throw new ApiError(404, "Comment not found")
    }

    // ownership check
    if (comment.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "Unauthorized request")
    }

    const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        {
            $set: {
                content
            }
        },
        {
            new: true
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            updatedComment,
            "Comment updated successfully"
        )
    )

})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
     const { commentId } = req.params

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment id")
    }

    const comment = await Comment.findById(commentId)

    if (!comment) {
        throw new ApiError(404, "Comment not found")
    }

    // ownership check
    if (comment.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "Unauthorized request")
    }

    await Comment.findByIdAndDelete(commentId)

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Comment deleted successfully"
        )
    )
})

export {
    getPostComments, 
    addComment, 
    updateComment,
     deleteComment
    }
