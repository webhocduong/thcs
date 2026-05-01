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
  import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Nút đăng nhập
document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Đăng nhập thành công");
    })
    .catch(err => alert(err.message));
});

// Kiểm tra user sau khi login
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      if (data.role === "admin") {
        document.getElementById("status").innerText = "Bạn là admin";
      } else {
        document.getElementById("status").innerText = "Bạn là user";
      }
    }
  }
});
