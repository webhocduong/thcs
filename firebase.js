// Import Firebase từ CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Config Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyDefd3yBo4hceclxAHKeykx6YbjJAwIjw",
  authDomain: "thcs-77d87.firebaseapp.com",
  projectId: "thcs-77d87",
  storageBucket: "thcs-77d87.appspot.com",
  messagingSenderId: "98344833709",
  appId: "1:98344833709:web:4ae3e87f3ea0befb552c24"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Auth
const auth = getAuth(app);

// Export ra để dùng file khác
export { auth };
