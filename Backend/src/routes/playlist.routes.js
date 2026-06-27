import { Router } from 'express';
import {
    addPostToPlaylist,
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getUserPlaylists,
    removePostFromPlaylist,
    updatePlaylist,
} from "../controllers/playlist.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/").post(createPlaylist)

router
    .route("/:playlistId")
    .get(getPlaylistById)
    .patch(updatePlaylist)
    .delete(deletePlaylist);

router.route("/add/:postId/:playlistId").patch(addPostToPlaylist);
router.route("/remove/:postId/:playlistId").patch(removePostFromPlaylist);

router.route("/user/:userId").get(getUserPlaylists);

export default router