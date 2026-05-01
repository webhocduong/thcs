import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ===== ĐĂNG KÝ USER =====
document.getElementById("registerBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // 🔥 Lưu USER vào Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: email,
      role: "user"
    });

    alert("Đăng ký USER thành công!");
  } catch (error) {
    alert(error.message);
  }
});
// ===== ĐĂNG NHẬP USER =====
import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔥 CHỜ HTML LOAD XONG
window.onload = () => {

  const loginBtn = document.getElementById("loginBtn");

  loginBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // 🔥 HIỂN THỊ
      document.getElementById("result").innerText = "Bạn là user";

    } catch (error) {
      alert(error.message);
    }

  });

};
