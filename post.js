import { auth, db } from "./firebase.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const postForm = document.getElementById("postForm");

onAuthStateChanged(auth, (user) => {

    if (!user) {
        alert("Bạn phải đăng nhập!");

        window.location.href = "index.html";
    }

});

postForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const title = document.getElementById("title").value;

    const content = document.getElementById("content").value;

    const imageInput = document.getElementById("image");

    const user = auth.currentUser;

    let imageUrl = "";

    // Upload ảnh lên Cloudinary
    if (imageInput.files[0]) {

        const file = imageInput.files[0];

        const formData = new FormData();

        formData.append("file", file);

        formData.append("upload_preset", "thcs_upload");

        const response = await fetch(
            "https://api.cloudinary.com/v1_1/dfoo4jpkz/image/upload",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        imageUrl = data.secure_url;
    }

    // Lưu Firebase
    await addDoc(collection(db, "posts"), {

        title: title,

        content: content,

        imageUrl: imageUrl,

        userEmail: user.email,

        userId: user.uid,

        createdAt: new Date()

    });

    alert("Đăng bài thành công!");

    window.location.href = "posts.html";

});
