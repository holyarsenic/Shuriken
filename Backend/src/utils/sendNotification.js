import admin from "./firebase.config.js";
import { User } from "../models/user.models.js";

const sendPushNotification = async ({ receiverId, title, body, data = {} }) => {

    const user = await User.findById(receiverId);

    if (!user?.fcmToken) return;

    await admin.messaging().send({
        token: user.fcmToken,
        notification: {
            title,
            body
        },
        data: Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
                key,
                String(value)
            ])
        )
    });

};

export default sendPushNotification;