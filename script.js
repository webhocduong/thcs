import { auth, db } from "./firebase.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Lấy input
const email = document.getElementById("email");
const password = document.getElementById("password");

// Lấy nút
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");

// Lấy message
const message = document.getElementById("message");


// 👉 Đăng ký
registerBtn.onclick = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    const user = userCredential.user;

    // Lưu vào Firestore
    await setDoc(doc(db, "nguoidung", user.uid), {
      email: email.value,
      role: "user"
    });

    message.innerText = "Đăng ký thành công!";
  } catch (error) {
    alert(error.message);
  }
};


// 👉 Đăng nhập
loginBtn.onclick = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    const user = userCredential.user;

    const docRef = doc(db, "nguoidung", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      if (data.role === "admin") {
        message.innerText = "Bạn là admin";
      } else {
        message.innerText = "Bạn là user";
      }
    } else {
      message.innerText = "Không tìm thấy dữ liệu!";
    }

  } catch (error) {
    alert(error.message);
  }
};
