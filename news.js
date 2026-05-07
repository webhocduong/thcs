import {
  db,
  auth
}
from "./firebase.js";

import {

  collection,

  getDocs,

  orderBy,

  query,

  deleteDoc,

  doc

}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const posts =
document.getElementById("posts");

/* LOAD POSTS */

async function loadPosts(){

  posts.innerHTML = "";

  const q = query(

    collection(
      db,
      "bai_viet"
    ),

    orderBy(
      "createdAt",
      "desc"
    )

  );

  const querySnapshot =
  await getDocs(q);

  querySnapshot.forEach((postDoc)=>{

    const data =
    postDoc.data();

    const postId =
    postDoc.id;

    let deleteButton = "";

    /* KIỂM TRA NGƯỜI ĐĂNG */

    if(
      auth.currentUser &&
      auth.currentUser.email ===
      data.userEmail
    ){

      deleteButton = `

        <button
        onclick="deletePost('${postId}')"
        class="delete-btn"
        >
          Xóa bài
        </button>

      `;
    }

    posts.innerHTML += `

      <div class="news-card">

        <h2>
          ${data.title}
        </h2>

        <p>
          ${data.content}
        </p>

        <small>
          Đăng bởi:
          ${data.userEmail}
        </small>

        <br><br>

        ${deleteButton}

      </div>

    `;

  });

}

/* XÓA BÀI */

window.deletePost =
async function(postId){

  const check =
  confirm(
    "Bạn có chắc muốn xóa?"
  );

  if(!check){

    return;
  }

  try{

    await deleteDoc(

      doc(
        db,
        "bai_viet",
        postId
      )

    );

    alert(
      "Đã xóa bài viết"
    );

    loadPosts();

  }

  catch(error){

    alert(
      error.message
    );
  }

};

loadPosts();
