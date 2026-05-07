import { db } from "./firebase.js";

import {

  collection,

  getDocs,

  orderBy,

  query

}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const posts =
document.getElementById("posts");

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

  querySnapshot.forEach((doc)=>{

    const data =
    doc.data();

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

      </div>

    `;

  });

}

loadPosts();
