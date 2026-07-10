import { Router } from 'express';
import {
    deletePost,
    getAllPosts,
    getPostById,
    publishAPost,
    postSearchBar,
    updatePost,
} from "../controllers/post.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
    .route("/")
    .get(getAllPosts)
    .post(
        upload.fields([
            {
                name: "postFile",
                maxCount: 1,
            }
            
        ]),
        publishAPost
    );

router
    .route("/:postId")
    .get(getPostById)
    .delete(deletePost)

router.route("/search").get(postSearchBar);

export default router