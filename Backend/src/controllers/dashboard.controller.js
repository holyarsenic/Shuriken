import mongoose from "mongoose"
import {Post} from "../models/post.models.js"
import {Subscription} from "../models/subscription.models.js"
import {Like} from "../models/like.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asynchandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
})

const getChannelPosts = asyncHandler(async (req, res) => {
    // TODO: Get all the posts uploaded by the channel
})

export {
    getChannelStats, 
    getChannelPosts
    }