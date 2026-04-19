// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// Cấu hình Firebase (THAY bằng config của bạn)
const firebaseConfig = {
  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDefd3yBo4rhceclxAHKeykx6YbjjAwlJw",
  authDomain: "thcs-77d87.firebaseapp.com",
  projectId: "thcs-77d87",
  storageBucket: "thcs-77d87.firebasestorage.app",
  messagingSenderId: "98344833709",
  appId: "1:98344833709:web:4ae3e87f3ea0befb552c24",
  measurementId: "G-79TEGRBEKC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
  authDomain: "DÁN_AUTH_DOMAIN",
  projectId: "DÁN_PROJECT_ID",
  storageBucket: "DÁN_STORAGE_BUCKET",
  messagingSenderId: "DÁN_MESSAGING_ID",
  appId: "DÁN_APP_ID"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

export { app };
