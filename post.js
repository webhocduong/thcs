import {
  db,
  auth
}
from "./firebase.js";

import {

  collection,

  addDoc,

  serverTimestamp

}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {

  onAuthStateChanged

}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* INPUT */

const titleInput =
document.getElementById("title");

const contentInput =
document.getElementById("content");

const postBtn =
document.getElementById("postBtn");

const result =
document.getElementById("result");

/* KIỂM TRA LOGIN */

onAuthStateChanged(
auth,
(user)=>{

  if(!user){

    alert(
      "Bạn cần đăng nhập"
    );

    window.location.href =
    "index.html";
  }

});

/* ĐĂNG BÀI */

postBtn.addEventListener(
"click",
async ()=>{

  const user =
  auth.currentUser;

  const title =
  titleInput.value;

  const content =
  contentInput.value;

  if(
    title === "" ||
    content === ""
  ){

    result.innerText =
    "Vui lòng nhập đầy đủ";

    return;
  }

  try{

    await addDoc(

      collection(
        db,
        "bai_viet"
      ),

      {

        title:title,

        content:content,

        userEmail:
        user.email,

        createdAt:
        serverTimestamp()

      }

    );

    result.innerText =
    "Đăng bài thành công";

    titleInput.value = "";

    contentInput.value = "";

  }

  catch(error){

    result.innerText =
    error.message;
  }

});
