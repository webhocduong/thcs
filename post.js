import { auth } from "./firebase.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const db = getFirestore();

const postBtn = document.getElementById("postBtn");

postBtn.addEventListener("click", async () => {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  try {
    await addDoc(collection(db, "posts"), {
      title: title,
      content: content,
      createdAt: new Date()
    });

    alert("Đăng bài thành công!");
  } catch (error) {
    alert(error.message);
  }
});
