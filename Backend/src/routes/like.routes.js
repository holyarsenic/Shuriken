import { Router } from 'express';
import {
    getLikedPosts,
    toggleCommentLike,
    togglePostLike,
    toggleTweetLike,
} from "../controllers/like.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/toggle/v/:postId").post(togglePostLike);
router.route("/toggle/c/:commentId").post(toggleCommentLike);
router.route("/toggle/t/:tweetId").post(toggleTweetLike);
router.route("/posts").get(getLikedPosts);

export default router