// Import từ firebase.js (file bạn đã tạo)
import { auth } from "./firebase.js";

// Import các hàm đăng ký / đăng nhập từ Firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// Lấy input
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Lấy nút
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");


// ===== ĐĂNG KÝ =====
registerBtn.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
  await createUserWithEmailAndPassword(auth, email, password);

  alert("Đăng ký thành công!");

  // 
  window.location.reload();

} catch (error) {
  alert(error.message);
}
});


// ===== ĐĂNG NHẬP =====
loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 
    if (user.email === vuthanhthuycb@gmail.com) {
      alert("Bạn là ADMIN");

      // 
      window.location.href = "admin.html";

    } else {
      alert("Bạn là USER");
    }

  } catch (error) {
    alert(error.message);
  }
});
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Đăng nhập thành công!");
  } catch (error) {
    alert(error.message);
  }
});
