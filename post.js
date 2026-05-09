import { auth, db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const CLOUD_NAME = "dfoo4jpkz";

const UPLOAD_PRESET = "thcs_upload";

const title = document.getElementById("title");

const content = document.getElementById("content");

const image = document.getElementById("image");

const postBtn = document.getElementById("postBtn");


postBtn.onclick = async () => {

    const user = auth.currentUser;

    if (!user) {

        alert("Phải đăng nhập");

        return;
    }

    let imageUrl = "";


    // UPLOAD ẢNH

    if (image.files[0]) {

        const file = image.files[0];

        const formData = new FormData();

        formData.append("file", file);

        formData.append("upload_preset", UPLOAD_PRESET);

        const response = await fetch(

            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        imageUrl = data.secure_url;
    }


    // LƯU FIREBASE

    await addDoc(collection(db, "posts"), {

        title: title.value,

        content: content.value,

        image: imageUrl,

        userEmail: user.email,

        createdAt: serverTimestamp()
    });

    alert("Đăng bài thành công");

    window.location.href = "posts.html";
};
