import {
    auth,
    db
} from "./firebase.js";

import {

    collection,

    addDoc,

    serverTimestamp

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {

    onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const title =
document.getElementById("title");

const content =
document.getElementById("content");

const postBtn =
document.getElementById("postBtn");

let currentUser = null;


/* KIỂM TRA ĐĂNG NHẬP */

onAuthStateChanged(auth, (user)=>{

    if(user){

        currentUser = user;

    }else{

        alert("Bạn phải đăng nhập");

        window.location.href = "index.html";
    }
});


/* ĐĂNG BÀI */

postBtn.onclick = async ()=>{

    if(!currentUser){

        alert("Chưa đăng nhập");

        return;
    }

    if(title.value.trim() === ""){

        alert("Nhập tiêu đề");

        return;
    }

    if(content.value.trim() === ""){

        alert("Nhập nội dung");

        return;
    }

    try{

        await addDoc(

            collection(db, "posts"),

            {

                title: title.value,

                content: content.value,

                userEmail: currentUser.email,

                userId: currentUser.uid,

                createdAt: serverTimestamp()

            }
        );

        alert("Đăng bài thành công");

        window.location.href = "posts.html";

    }catch(error){

        alert(error.message);
    }
};
