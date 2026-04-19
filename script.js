// Import Firebase Auth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Import firebase config
import { auth } from "./firebase.js";

// Đợi web load xong
document.addEventListener("DOMContentLoaded", () => {

    console.log("JS đã chạy");

    const registerBtn = document.getElementById("registerBtn");
    const loginBtn = document.getElementById("loginBtn");

    // ĐĂNG KÝ
    registerBtn.addEventListener("click", async () => {
        console.log("Đã bấm đăng ký");

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Đăng ký thành công!");
        } catch (error) {
            alert(error.message);
        }
    });

    // ĐĂNG NHẬP
    loginBtn.addEventListener("click", async () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Đăng nhập thành công!");
        } catch (error) {
            alert(error.message);
        }
    });

});
   
