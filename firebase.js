// Import Firebase từ CDN (quan trọng)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyDefd3yBo4hceclxAHKeykx6YbjJAwiJw",
  authDomain: "thcs-77d87.firebaseapp.com",
  projectId: "thcs-77d87",
  storageBucket: "thcs-77d87.firebasestorage.app",
  messagingSenderId: "98344833709",
  appId: "1:98344833709:web:4ae3e87f3ea0befb552c24",
  measurementId: "G-79TEGRBEKC"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Export để dùng ở file khác
export { app };
