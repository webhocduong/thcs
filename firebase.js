// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Config của bạn
const firebaseConfig = {
    apiKey: "AIzaSyDc9tXqKAFo9n1wLZH5Xv_IjwjCAX-gwcc",
    authDomain: "thcs-db7f8.firebaseapp.com",
    projectId: "thcs-db7f8",
    storageBucket: "thcs-db7f8.firebasestorage.app",
    messagingSenderId: "862239704456",
    appId: "1:862239704456:web:10e18bec6918a656a2e63d"
  };
// Khởi tạo
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export ra ngoài để file khác dùng
export { auth };
