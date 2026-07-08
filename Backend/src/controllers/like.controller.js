import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.models.js"
import {Post} from "../models/post.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asynchandler.js"

 const togglePostLike = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    if (!mongoose.isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid post id");
    }

    const existingLike = await Like.findOne({
        post: postId,
        likedBy: req.user._id
    });

    // UNLIKE
    if (existingLike) {
        await Like.deleteOne({
            post: postId,
            likedBy: req.user._id
        });

        await Post.findByIdAndUpdate(postId, {
            $inc: { likes: -1 }
        });

        return res.status(200).json(
            new ApiResponse(200, {isLiked: false}, "Post unliked successfully")
        );
    }

    // LIKE
    await Like.create({
        post: postId,
        likedBy: req.user._id
    });

    await Post.findByIdAndUpdate(postId, {
        $inc: { likes: 1 }
    });

    return res.status(200).json(
        new ApiResponse(200, {isLiked: true}, "Post liked successfully")
    );
});

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

    const { channelId } = req.params;

    if (!mongoose.isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel id");
    }

    const channel = await User.findById(channelId);

    if (!channel) {
        throw new ApiError(404, "Channel not found");
    }


    const likedPosts = await Like.aggregate([
        {
            $match: {
                likedBy: new mongoose.Types.ObjectId(channelId),
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
                as: "posts",

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
                                        userName: 1
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
                            title: 1,
                            description: 1,
                            postFile: 1,
                            owner: 1
                        }
                    }
                ]
            }
        },

        {
            $addFields: {
                post: {
                    $first: "$posts"
                }
            }
        },

        {
            $project: {
                post: 1
            }
        }
    ]);


    return res.status(200).json(
        new ApiResponse(
            200,
            likedPosts,
            "Liked posts fetched successfully"
        )
    );
});

export {
    toggleCommentLike,
    togglePostLike,
    getLikedPosts
}