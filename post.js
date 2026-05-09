import {
    auth,
    db
} from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const title =
document.getElementById("title");

const content =
document.getElementById("content");

const postBtn =
document.getElementById("postBtn");


postBtn.onclick = async ()=>{

    const user = auth.currentUser;

    if(!user){

        alert("Bạn phải đăng nhập");

        return;
    }

    await addDoc(

        collection(db, "posts"),

        {

            title: title.value,

            content: content.value,

            userEmail: user.email,

            userId: user.uid,

            createdAt: serverTimestamp()

        }
    );

    alert("Đăng bài thành công");

    window.location.href = "posts.html";
};
