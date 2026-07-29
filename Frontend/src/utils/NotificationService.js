import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../../firebase"
import api from "../api/axios";

export const requestNotificationPermission = async () => {
    try {

        const permission = await Notification.requestPermission();

        if (permission !== "granted") {
            return;
        }

        const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
        });

        if (!token) return;

        console.log("FCM Token:", token);

        await api.post(
            "/notifications/save-fcm-token",
            { token }
        );

    } catch (err) {
        console.log(err);
    }
};

export const listenNotifications = () => {
    onMessage(messaging, (payload) => {
        console.log(payload);

        alert(payload.notification.title);
    });
};