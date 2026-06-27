import mongoose, {isValidObjectId} from "mongoose"
import {Post} from "../models/post.models.js"
import {User} from "../models/user.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudnary} from "../utils/cloudnary.js"


const getAllPosts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all posts based on query, sort, pagination
})

const publishAPost = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video
})

const getPostById = asyncHandler(async (req, res) => {
    const { postId } = req.params
    //TODO: get post by id
})

const updatePost = asyncHandler(async (req, res) => {
    const { postId } = req.params
    //TODO: update post details like title, description, thumbnail

})

const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params
    //TODO: delete post
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { postId } = req.params
})

export {
    getAllPosts,
    publishAPost,
    getPostById,
    updatePost,
    deletePost,
    togglePublishStatus
}