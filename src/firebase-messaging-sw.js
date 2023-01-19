// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
// importScripts('https://www.gstatic.com/firebasejs/9.9.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.9.0/firebase-messaging-compat.js');
// self.importScripts('https://www.gstatic.com/firebasejs/9.9.0/firebase-messaging-sw.js');
importScripts('https://www.gstatic.com/firebasejs/9.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.9.0/firebase-messaging-compat.js');
// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    apiKey: "AIzaSyBxgkL8MRr87m5wcy-CkFtAVOlEGpHN0oQ",
    authDomain: "agile-advantage.firebaseapp.com",
    projectId: "agile-advantage",
    storageBucket: "agile-advantage.appspot.com",
    messagingSenderId: "312319125607",
    appId: "1:312319125607:web:bce75cf67a1057311d4cc2",
    measurementId: "G-NDFS5XRC42"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
