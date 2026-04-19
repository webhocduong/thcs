import { auth } from "./firebase.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 👉 kiểm tra nếu không phải admin thì đá ra ngoài
onAuthStateChanged(auth, (user) => {
  if (user) {
    if (user.email !== vuthanhthuycb@gmail.com) {
      alert("Bạn không phải admin!");
      window.location.href = "index.html";
    }
  } else {
    window.location.href = "index.html";
  }
});

// 👉 đăng xuất
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  alert("Đã đăng xuất");
  window.location.href = "index.html";
});
