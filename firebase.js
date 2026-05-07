import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// FIREBASE CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyDefd3yBo4rheeclxAHkeykx6YbjjAwlJw",
    authDomain: "thcs-77d87.firebaseapp.com",
    projectId: "thcs-77d87",
    storageBucket: "thcs-77d87.appspot.com",
    messagingSenderId: "98344833709",
    appId: "1:98344833709:web:4543a92e785203a1552c24"
};
// KHỞI TẠO FIREBASE
const app = initializeApp(firebaseConfig);
// EXPORT
export const auth = getAuth(app);
export const db = getFirestore(app);
