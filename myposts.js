import {
  db,
  auth
}
from "./firebase.js";

import {

  collection,

  getDocs,

  query,

  where

}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {

  onAuthStateChanged

}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const posts =
document.getElementById("posts");

onAuthStateChanged(
auth,
async(user)=>{

  if(!user){

    window.location.href =
    "index.html";

    return;
  }

  posts.innerHTML = "";

  const q = query(

    collection(
      db,
      "bai_viet"
    ),

    where(
      "userEmail",
      "==",
      user.email
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

      </div>

    `;

  });

});
