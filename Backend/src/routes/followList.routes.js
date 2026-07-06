import { Router } from 'express';
import {
    toggleFollow,
    getUserChannelFollowers,
    getFollowedChannels
} from "../controllers/followList.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
    .route("/c/:channelId")
    .get(getUserChannelFollowers)
    .post(toggleFollow);

router.route("/u/:followedId").get(getFollowedChannels);

export default router