import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    saveFcmToken,
    getAllNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification
} from "../controllers/notification.controller.js";

const router = Router();
router.use(verifyJWT);


router.route("/save-fcm-token")
.post(saveFcmToken);

router.route("/")
.get(getAllNotification);

router.route("/read-all")
.patch(markAllNotificationsAsRead);

router.route("/:notificationId/read")
.patch(markNotificationAsRead);

router.route("/:notificationId")
.delete(deleteNotification);

export default router;