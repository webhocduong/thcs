// Import Firebase từ CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDefd3yBo4rhceclxAHKeykx6YbjjAwlJw",
  authDomain: "thcs-77d87.firebaseapp.com",
  projectId: "thcs-77d87",
  storageBucket: "thcs-77d87.firebasestorage.app",
  messagingSenderId: "98344833709",
  appId: "1:98344833709:web:4543a92e785203a1552c24",
  measurementId: "G-KF9RFE2NJ2"
};
// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Lấy Auth
const auth = getAuth(app);

// Export để script.js dùng
export { auth };
