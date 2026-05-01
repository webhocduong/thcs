import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Lấy phần tử
const email = document.getElementById("email");
const password = document.getElementById("password");
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");

// 👉 DEBUG: xem có lấy được nút không
console.log(registerBtn, loginBtn);

// Đăng ký
registerBtn.onclick = async () => {
  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    const user = userCred.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: "user"
    });

    message.innerText = "Đăng ký thành công";
  } catch (err) {
    alert(err.message);
  }
};

// Đăng nhập
loginBtn.onclick = async () => {
  try {
    const userCred = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    const user = userCred.user;

    const docSnap = await getDoc(doc(db, "users", user.uid));

    if (docSnap.exists()) {
      const data = docSnap.data();

      if (data.role === "admin") {
        message.innerText = "Bạn là admin";
      } else {
        message.innerText = "Bạn là user";
      }
    }

  } catch (err) {
    alert(err.message);
  }
};
