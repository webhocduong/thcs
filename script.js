// Import Firebase Auth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Import auth từ firebase.js
import { auth } from "./firebase.js";

// Chờ web load xong
document.addEventListener("DOMContentLoaded", () => {

  // Lấy nút
  const registerBtn = document.getElementById("registerBtn");
  const loginBtn = document.getElementById("loginBtn");

  // ===== ĐĂNG KÝ =====
  registerBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert("Đăng ký thành công!");
      console.log(userCredential.user);
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  });

  // ===== ĐĂNG NHẬP =====
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert("Đăng nhập thành công!");
      console.log(userCredential.user);
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  });

});
 
