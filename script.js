import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// 🔥 CHỜ LOAD HTML
window.onload = () => {
  const registerBtn = document.getElementById("registerBtn");
  const loginBtn = document.getElementById("loginBtn");
  // ===== ĐĂNG KÝ =====
  registerBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      document.getElementById("result").innerText = "Đăng ký thành công!";
    } catch (error) {
      alert(error.message);
    }
  });
  // ===== ĐĂNG NHẬP =====
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      document.getElementById("result").innerText = "Bạn là user";
    } catch (error) {
      alert(error.message);
    }
  });
};
