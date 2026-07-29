/* global importScripts, firebase */



importScripts("https://www.gstatic.com/firebasejs/12.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging-compat.js");

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
  console.log("Background message:", payload);

  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "/shuriken-192x192.png", 
    }
  );
});