import { getToken } from "firebase/messaging";
import { messaging } from "../../firebase";
import api from "../api/axios";


export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Notification permission denied");
      return;
    }

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    if (!token) return;

    await api.post("/notification/save-fcm-token", {
      token,
    });

  } catch (err) {
    console.error("FCM permission error:", err);
  }
};
