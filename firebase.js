// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// Cấu hình Firebase (THAY bằng config của bạn)
const firebaseConfig = {
  apiKey: "DÁN_API_KEY",
  authDomain: "DÁN_AUTH_DOMAIN",
  projectId: "DÁN_PROJECT_ID",
  storageBucket: "DÁN_STORAGE_BUCKET",
  messagingSenderId: "DÁN_MESSAGING_ID",
  appId: "DÁN_APP_ID"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

export { app };
