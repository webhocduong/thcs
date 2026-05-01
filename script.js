import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Lấy element
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const btnRegister = document.getElementById("btnRegister");
const btnLogin = document.getElementById("btnLogin");
const message = document.getElementById("message");
btnLogin.addEventListener("click", async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const docRef = doc(db, "người dùng", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();

            if (data.role === "admin") {
                message.innerText = "Bạn là ADMIN";
            } else {
                message.innerText = "Bạn là USER";
            }
        } else {
            message.innerText = "Không có dữ liệu user";
        }

    } catch (error) {
        alert(error.message);
    }
});
// Đăng ký
btnRegister.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Đăng ký thành công");
  } catch (error) {
    alert(error.message);
  }
});

// Đăng nhập
btnLogin.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const docRef = doc(db, "người dùng", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      if (data.role === "admin") {
        message.innerText = "Bạn là ADMIN";
      } else {
        message.innerText = "Bạn là USER";
      }
    } else {
      message.innerText = "Không có dữ liệu user";
    }

  } catch (error) {
    alert(error.message);
  }
});
