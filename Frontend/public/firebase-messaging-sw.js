/* global importScripts, firebase */

importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyC0sp7plaDIL3ZzY4hMMnvaSLNlMFbVeJk",
  authDomain: "shuriken-6a18a.firebaseapp.com",
  projectId: "shuriken-6a18a",
  storageBucket: "shuriken-6a18a.firebasestorage.app",
  messagingSenderId: "223640584906",
  appId: "1:223640584906:web:1ac854da929b346206ea33",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(
    payload.data?.title || "Shuriken",
    {
      body: payload.data?.body || "",
      icon: "/shuriken-192x192.png",
    }
  );

});