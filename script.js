// Import Firebase Auth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Import firebase config
import { auth } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {

    const registerBtn = document.getElementById("registerBtn");
    const loginBtn = document.getElementById("loginBtn");

    console.log("JS đã chạy"); // test

    // ĐĂNG KÝ
    registerBtn.addEventListener("click", async () => {
        console.log("Đã bấm đăng ký"); // test

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            alert("Đăng ký thành công!");
        } catch (error) {
            alert(error.message);
            console.error(error);
        }
    });

    // ĐĂNG NHẬP
    loginBtn.addEventListener("click", async () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            alert("Đăng nhập thành công!");
        } catch (error) {
            alert(error.message);
        }
    });

});
