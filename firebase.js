// Import Firebase từ CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Config của bạn (đã đúng)
const firebaseConfig = {
  apiKey: "AIzaSyDefd3yBo4hceclxAHKeykx6YbjjAwIJw",
  authDomain: "thcs-77d87.firebaseapp.com",
  projectId: "thcs-77d87",
  storageBucket: "thcs-77d87.firebasestorage.app",
  messagingSenderId: "98344833709",
  appId: "1:98344833709:web:4543a92e785203a1552c24",
  measurementId: "G-KF9RFE2NJ2"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Auth
const auth = getAuth(app);

// Export để dùng file khác
export { auth };
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  ...
};
