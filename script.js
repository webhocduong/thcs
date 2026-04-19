// Import Firebase
import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Lấy nút
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");

// Đăng ký
registerBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Đăng ký thành công!");
  } catch (error) {
    alert(error.message);
  }
});
     
