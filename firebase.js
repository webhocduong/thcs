// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Config của bạn
const firebaseConfig = {
  apiKey: "AIzaSyDefd3yBo4hceclxAHKeykx6YbjjAwIJw",
  authDomain: "thcs-77d87.firebaseapp.com",
  projectId: "thcs-77d87",
  storageBucket: "thcs-77d87.appspot.com",
  messagingSenderId: "98344833709",
  appId: "1:98344833709:web:4543a92e785203a1552c24"
};

// Khởi tạo
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export ra ngoài để file khác dùng
export { auth };
