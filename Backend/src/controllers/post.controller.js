import mongoose, {isValidObjectId} from "mongoose";
import {Post} from "../models/post.models.js";
import {User} from "../models/user.models.js";
import { Like } from "../models/like.models.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asynchandler.js";
import {uploadOnCloudnary} from "../utils/cloudnary.js";
import {PostView} from "../models/postView.models.js";


const getAllPosts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 20 } = req.query;

    const posts = await Post.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner"
            }
        },
        {
            $unwind: "$owner"
        },
        {
            $project: {
                title: 1,
                postFile: 1,
                owner: {
                    userName: "$owner.userName",
                    avatar: "$owner.avatar"
                }
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $skip: (page - 1) * limit
        },
        {
            $limit: Number(limit)
        }
    ]);

    res.status(200).json(
        new ApiResponse(
            200,
            posts,
            "Posts fetched"
        )
    );
});

const publishAPost = asyncHandler(async (req, res) => {
    // TODO: get post, upload to cloudinary, create video
      const { title, description } = req.body

    if (
        [title, description].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Title and description are required")
    }

    const PostFileLocalPath = req.files?.postFile?.[0]?.path


    if (!PostFileLocalPath) {
        throw new ApiError(400, "Video file is required")
    }


    const postFile = await uploadOnCloudnary(PostFileLocalPath)


    if (!postFile) {
        throw new ApiError(500, "Error while uploading post")
    }

    const newPost = await Post.create({
        title,
        description,
        postFile: postFile.url,
        owner: req.user?._id,
        isPublished: true
    })

    const uploadedPost = await Post.findById(newPost._id)

    if (!uploadedPost) {
        throw new ApiError(500, "Something went wrong while uploading post")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            uploadedPost,
            "Post uploaded successfully"
        )
    )
})

const getPostById = asyncHandler(async (req, res) => {
    const { postId } = req.params
    //TODO: get post by id

    if (!isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid post id")
    }

    const post = await Post.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(postId)
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
                            userName: 1,
                            avatar: 1,
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

    if (!post?.length) {
        throw new ApiError(404, "Post not found")
    }

    // increment views
        const alreadyViewed = await PostView.findOne({
        post: postId,
        userId: req.user._id,
        });

        if (!alreadyViewed) {
        await PostView.create({
            post: postId,
            userId: req.user._id,
        });

        await Post.findByIdAndUpdate(postId, {
            $inc: { views: 1 },
        });
        }

    // add to watch history
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $addToSet: {
                watchHistory: postId
            }
        }
    )

  // Check if current user liked this post
        const liked = await Like.findOne({
            post: postId,
            likedBy: req.user._id
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    ...post[0],
                    isLiked: !!liked
                },
                "Post fetched successfully"
            )
        );
})

const updatePost = asyncHandler(async (req, res) => {
    const { postId } = req.params
    //TODO: update post details like title, description, thumbnail
    const { title, description } = req.body

    if (!isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid post id")
    }

    const post = await Post.findById(postId)

    if (!post) {
        throw new ApiError(404, "Post not found")
    }

    // ownership check
    if (post.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "Unauthorized request")
    }

    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
            $set: {
                title: title || post.title,
                description: description || post.description
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
            updatedPost,
            "Post updated successfully"
        )
    )


})

const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params
    //TODO: delete post

    if (!isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid post id")
    }

    const post = await Post.findById(postId)

    if (!post) {
        throw new ApiError(404, "Post not found")
    }

    // ownership check
    if (post.owner.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "Unauthorized request")
    }

     await Like.deleteMany({
        post: postId
    });

     await Comment.deleteMany({ 
        post: postId 
    });

    await Post.findByIdAndDelete(postId)

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Post deleted successfully"
        )
    )

})

const userSearchBar = asyncHandler(async (req, res) => {
    const { query } = req.query;

      if (!query?.trim()) {
        return res.status(200).json(
            new ApiResponse(
                200,
                [],
                "No search query"
            )
        );
    }
    
    const users = await User.aggregate([
        {
            $match: {
                userName: {
                    $regex: query,
                    $options: "i"
                }
            }
        },
        {
            $project: {
                userName: 1,
                avatar: 1,
                fullName: 1
            }
        },
        {
            $limit: 10
        }
    ]);

    res.status(200).json(
        new ApiResponse(
            200,
            users,
            "Users found"
        )
    );
});

export {
    getAllPosts,
    publishAPost,
    getPostById,
    updatePost,
    deletePost,
    userSearchBar
}
