import {
    auth,
    db
} from "./firebase.js";

import {

    collection,

    getDocs,

    deleteDoc,

    doc

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const postsContainer =
document.getElementById("postsContainer");


async function loadPosts(){

    const querySnapshot =
    await getDocs(collection(db, "posts"));

    postsContainer.innerHTML = "";


    querySnapshot.forEach((docSnap)=>{

        const post =
        docSnap.data();

        const div =
        document.createElement("div");

        div.className = "postCard";


        div.innerHTML = `

            ${
                post.imageUrl

                ?

                `<img
                    src="${post.imageUrl}"
                    class="postImage"
                >`

                :

                ""
            }

            <h2>
                ${post.title}
            </h2>

            <p>
                ${post.content}
            </p>

            <small>
                Đăng bởi:
                ${post.userEmail}
            </small>

            <br><br>

            ${
                auth.currentUser &&
                auth.currentUser.uid === post.userId

                ?

                `<button
                    class="deleteBtn"
                    data-id="${docSnap.id}">
                    Xóa bài
                </button>`

                :

                ""
            }

        `;


        postsContainer.appendChild(div);
    });


    /* XÓA BÀI */

    document
    .querySelectorAll(".deleteBtn")

    .forEach((btn)=>{

        btn.onclick = async ()=>{

            await deleteDoc(

                doc(
                    db,
                    "posts",
                    btn.dataset.id
                )
            );

            loadPosts();
        };
    });
}

loadPosts();
