import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ======================
// LẤY HTML
// ======================

const emailInput =
  document.getElementById("email");

const passwordInput =
  document.getElementById("password");

const registerBtn =
  document.getElementById("registerBtn");

const loginBtn =
  document.getElementById("loginBtn");

const result =
  document.getElementById("result");


// ======================
// ĐĂNG KÝ
// ======================

registerBtn.addEventListener(
  "click",
  async () => {

    const email = emailInput.value;

    const password = passwordInput.value;

    try {

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      let role = "user";

      // EMAIL ADMIN
      if (
        email ===
        "vuthanhthuycb@gmail.com"
      ) {
        role = "admin";
      }

      // LƯU FIRESTORE
      await setDoc(
        doc(db, "nguoi_dung", user.uid),
        {
          email: email,
          role: role
        }
      );

      result.innerText =
        "Đăng ký thành công";

    } catch (error) {

      result.innerText =
        error.message;
    }
  }
);


// ======================
// ĐĂNG NHẬP
// ======================

loginBtn.addEventListener(
  "click",
  async () => {

    const email = emailInput.value;

    const password = passwordInput.value;

    try {

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      const docRef =
        doc(db, "nguoi_dung", user.uid);

      const docSnap =
        await getDoc(docRef);

      if (docSnap.exists()) {

        const data = docSnap.data();

        if (data.role === "admin") {

          result.innerText =
            "Bạn là ADMIN";

        } else {

          result.innerText =
            "Bạn là USER";
        }
window.location.href =
"news.html";
      } else {

        result.innerText =
          "Không có dữ liệu user";
      }

    } catch (error) {

      result.innerText =
        error.message;
    }
  }
);
