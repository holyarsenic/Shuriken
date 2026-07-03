import mongoose, {isValidObjectId} from "mongoose"
import {Post} from "../models/post.models.js"
import {User} from "../models/user.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudnary} from "../utils/cloudnary.js"


const getAllPosts = asyncHandler(async (req, res) => {
    //TODO: get all posts based on query, sort, pagination
     
    const {
        page = 1,
        limit = 10,
        query,
        sortBy = "createdAt",
        sortType = "desc",
        userId
    } = req.query

    const matchCondition = {
        isPublished: true
    }

    // search query
    if (query) {
        matchCondition.title = {
            $regex: query,
            $options: "i"
        }
    }

    // user specific videos
    if (userId && isValidObjectId(userId)) {
        matchCondition.owner = new mongoose.Types.ObjectId(userId)
    }

    const sortOptions = {}

    sortOptions[sortBy] = sortType === "asc" ? 1 : -1

    const posts = await Post.aggregate([
        {
            $match: matchCondition
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
        },
        {
            $sort: sortOptions
        },
        {
            $skip: (Number(page) - 1) * Number(limit)
        },
        {
            $limit: Number(limit)
        }
    ])

    const totalPosts = await Post.countDocuments(matchCondition)

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                posts: posts,
                totalPosts: totalPosts,
                currentPage: Number(page),
                totalPages: Math.ceil(totalPosts / limit)
            },
            "Posts fetched successfully"
        )
    )
    
})

const publishAPost = asyncHandler(async (req, res) => {
    // TODO: get video, upload to cloudinary, create video
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
    await Post.findByIdAndUpdate(
        postId,
        {
            $inc: {
                views: 1
            }
        }
    )

    // add to watch history
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $addToSet: {
                watchHistory: postId
            }
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            post[0],
            "Post fetched successfully"
        )
    )
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

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { postId } = req.params

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
                isPublished: !post.isPublished
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
            `Post ${
                updatedPost.isPublished
                    ? "published"
                    : "unpublished"
            } successfully`
        )
    )
})

export {
    getAllPosts,
    publishAPost,
    getPostById,
    updatePost,
    deletePost,
    togglePublishStatus
}