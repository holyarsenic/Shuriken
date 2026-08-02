import { messaging } from "../utils/firebase.config.js"
import { User } from "../models/user.models.js";

const sendPushNotification = async ({ receiverId, title, body, data = {} }) => {

    const user = await User.findById(receiverId);

    if (!user?.fcmToken) {
        console.log("No token found");
        return;
    }

    try {

        const response = await messaging.send({
            token: user.fcmToken,
            data: {
                title: String(title),
                body: String(body),
                ...Object.fromEntries(
                    Object.entries(data).map(([key, value]) => [
                        key,
                        String(value)
                    ])
                )
            }
        });
        console.log("FCM SUCCESS:", response);

    } catch(error) {

        console.log("FCM FAILED:", error.code);

        if (error.code === "messaging/registration-token-not-registered") {

            await User.findByIdAndUpdate(
                receiverId,
                {
                    $unset: {
                        fcmToken: 1
                    }
                }
            );

            console.log("Removed invalid FCM token");
        }

    }
};

export default sendPushNotification;